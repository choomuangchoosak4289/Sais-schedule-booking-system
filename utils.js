if (typeof localforage !== 'undefined') {
    window.DB_CACHE = localforage.createInstance({ name: 'SAIS_DB_CACHE' });
    window.DB_QUEUE = localforage.createInstance({ name: 'SAIS_OFFLINE_QUEUE' });
} else {
    window.DB_CACHE = { getItem: async () => null, setItem: async () => null };
    window.DB_QUEUE = { getItem: async () => [], setItem: async () => null };
}

window.SAIS_UTILS = {
    getLocalDateString: (dateObj) => {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    getMapEmbedUrl: (link) => {
        if (!link) return null;
        if (String(link).includes("output=embed")) return link;
        try {
            let latLng = "";
            const regexAt = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
            const matchAt = String(link).match(regexAt);
            const regexDirect = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
            const matchDirect = String(link).match(regexDirect);
            if (matchAt) latLng = `${matchAt[1]},${matchAt[2]}`;
            else if (matchDirect) latLng = `${matchDirect[1]},${matchDirect[2]}`;
            if (latLng) return `http://googleusercontent.com/maps.google.com/maps?q=${latLng}&hl=th&z=16&output=embed`;
            return `http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(link)}&hl=th&z=16&output=embed`;
        } catch (e) { return null; }
    },
    exportToCSV: (bookingsData) => {
        if (!bookingsData || bookingsData.length === 0) { alert("ไม่มีข้อมูล"); return; }
        const headers = ["วันที่", "Eq No.", "Unit", "โครงการ", "พื้นที่", "ประเภท", "ผู้ตรวจ", "Layout", "Wiring", "Pre-check", "ผู้จอง"];
        const rows = bookingsData.map(b => [
            b.date ? String(b.date).split('T')[0] : '', `"${b.equipment_no || ''}"`, `"${b.unit_no || ''}"`, `"${b.site_name || ''}"`, b.area || '', b.job_type || '', b.inspector_name || '',
            String(b.layout_doc) === 'true' ? 'ผ่าน' : 'รอ', String(b.wiring_doc) === 'true' ? 'ผ่าน' : 'รอ', String(b.precheck_doc) === 'true' ? 'ผ่าน' : 'รอ', b.created_by || ''
        ]);
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a"); link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", `SAIS_Report.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link);
    },
    // 📍 [ข้อ 4] API Retry with Exponential Backoff
    fetchWithRetry: async (url, options, retries = 3, delay = 2000) => {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (err) {
            if (retries > 0) {
                console.log(`Retrying API in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return window.SAIS_UTILS.fetchWithRetry(url, options, retries - 1, delay * 2);
            } else { throw err; }
        }
    },
    // 📍 [ข้อ 3] ระบบบีบอัดรูปภาพก่อนส่งขึ้น Google Drive (กันมือถือค้าง)
    compressImage: (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; // บีบความกว้างเหลือ 800px
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH; canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.6)); // ลดคุณภาพเหลือ 60%
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
};
