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
        // 📍 บังคับใช้แผนที่ให้เป็น HTTPS เสมอเพื่อป้องกันเบราว์เซอร์บล็อก
        if (strLink.includes("output=embed")) return strLink.replace("http://", "https://");
        try {
            const coordRegex = /^(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)$/;
            const matchCoord = strLink.match(coordRegex);
            if (matchCoord) return `https://maps.google.com/maps?q=${matchCoord[1]},${matchCoord[2]}&hl=th&z=16&output=embed`;
            return `https://maps.google.com/maps?q=${encodeURIComponent(strLink)}&hl=th&z=16&output=embed`;
        } catch (e) { return null; }
    },
    exportToCSV: (bookingsData) => {
        if (!bookingsData || bookingsData.length === 0) { alert("ไม่มีข้อมูล"); return; }
        const headers = ["วันที่", "Eq No.", "Product Line", "Unit", "โครงการ", "พื้นที่", "ประเภท", "ผู้ตรวจ", "Layout", "Wiring", "Pre-check", "ผู้จอง"];
        const rows = bookingsData.map(b => [
            b.date ? String(b.date).split('T')[0] : '', `"${b.equipment_no || ''}"`, `"${b.product_line || ''}"`, `"${b.unit_no || ''}"`, `"${b.site_name || ''}"`, b.area || '', b.job_type || '', b.inspector_name || '',
            String(b.layout_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', String(b.wiring_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', String(b.precheck_doc) === 'true' ? 'ส่งแล้ว' : 'ยังไม่ส่ง', b.created_by || ''
        ]);
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
        const link = document.createElement("a"); link.setAttribute("href", encodeURI(csvContent)); link.setAttribute("download", `SAIS_Report.csv`); document.body.appendChild(link); link.click(); document.body.removeChild(link);
    },
    
    // 📍 ระบบสร้างใบสั่งงาน PDF (Work Order)
    generatePDF: (b) => {
        if (typeof html2pdf === 'undefined') { alert('กำลังโหลดเครื่องมือ PDF กรุณารอสักครู่...'); return; }
        
        const container = document.createElement('div');
        container.style.padding = '40px';
        container.style.fontFamily = 'Sarabun, sans-serif';
        container.innerHTML = `
            <div style="text-align: center; border-bottom: 2px solid #D0021B; padding-bottom: 20px; margin-bottom: 20px;">
                <h1 style="color: #D0021B; margin: 0; font-size: 24px;">WORK ORDER (ใบสั่งงาน)</h1>
                <p style="margin: 5px 0 0 0; color: #64748b;">SAIS BOOKING SYSTEM</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; width: 50%;"><b>วันที่จอง:</b> ${b.date ? b.date.split('T')[0] : '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; width: 50%;"><b>ผู้ตรวจสอบ:</b> ${b.inspector_name || '-'}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>โครงการ:</b> ${b.site_name || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>พื้นที่:</b> ${b.area || '-'}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>Eq No.:</b> ${b.equipment_no || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>Unit:</b> ${b.unit_no || '-'}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>ประเภทงาน:</b> ${b.job_type || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>Product Line:</b> ${b.product_line || '-'}</td></tr>
                <tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>Foreman:</b> ${b.foreman || '-'}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><b>เบอร์โทร:</b> ${b.tel || '-'}</td></tr>
            </table>
            <div style="margin-bottom: 40px; font-size: 14px;">
                <b>หมายเหตุเพิ่มเติม:</b>
                <p style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; min-height: 80px;">${b.notes || '-'}</p>
            </div>
            <div style="margin-top: 60px; display: flex; justify-content: space-between; font-size: 14px;">
                <div style="text-align: center; width: 40%;">
                    <div style="border-bottom: 1px dashed #64748b; height: 30px; margin-bottom: 10px;"></div>
                    <span>( ${b.created_by || '____________________'} )</span><br><span style="color: #64748b;">ผู้ขอรับการตรวจ</span>
                </div>
                <div style="text-align: center; width: 40%;">
                    <div style="border-bottom: 1px dashed #64748b; height: 30px; margin-bottom: 10px;"></div>
                    <span>( ${b.inspector_name || '____________________'} )</span><br><span style="color: #64748b;">ผู้ตรวจสอบ</span>
                </div>
            </div>
        `;

        const opt = {
            margin: 0.5, filename: `WorkOrder_${b.equipment_no}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(container).save();
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
