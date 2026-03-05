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
        let strLink = String(link).trim();
        // 📍 แก้ปัญหา Maps: บังคับใช้ iframe มาตรฐานของ Google
        if (strLink.includes("output=embed")) return strLink.replace("http://", "https://");
        try {
            const coordRegex = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
            const matchCoord = strLink.match(coordRegex);
            if (matchCoord) {
                return `https://maps.google.com/maps?q=${matchCoord[1]},${matchCoord[2]}&hl=th&z=16&output=embed`;
            }
            return `https://maps.google.com/maps?q=${encodeURIComponent(strLink)}&hl=th&z=16&output=embed`;
        } catch (e) { return null; }
    },
    exportToCSV: (bookingsData) => {
        if (!bookingsData || bookingsData.length === 0) { alert("ไม่มีข้อมูล"); return; }
        // 📍 เพิ่ม Product line ใน Excel
        const headers = ["วันที่", "Eq No.", "Product Line", "Unit", "โครงการ", "พื้นที่", "ประเภท", "ผู้ตรวจ", "Layout", "Wiring", "Pre-check", "ผู้จอง"];
        const rows = bookingsData.map(b => [
            b.date ? String(b.date).split('T')[0] : '', `"${b.equipment_no || ''}"`, `"${b.product_line || ''}"`, `"${b.unit_no || ''}"`, `"${b.site_name || ''}"`, b.area || '', b.job_type || '', b.inspector_name || '',
            String(b.layout_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', String(b.wiring_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', String(b.precheck_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', b.created_by || ''
        ]);
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a"); link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", `SAIS_Report.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link);
    },
    fetchWithRetry: async (url, options, retries = 3, delay = 2000) => {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error('API Error');
            return await res.json();
        } catch (err) {
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
                return window.SAIS_UTILS.fetchWithRetry(url, options, retries - 1, delay * 2);
            } else { throw err; }
        }
    },
    compressImage: (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800; 
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH; canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.6)); 
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
};
