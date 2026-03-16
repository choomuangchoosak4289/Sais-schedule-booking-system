const { useState, useEffect, useMemo, useRef } = React;

const Icons = {
    Book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    List: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    LogOut: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    ChevronLeft: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
    ChevronRight: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
    Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    Alert: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    EyeOff: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
    Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    Upload: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
    Chart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    CalendarX: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="14" y2="18"></line><line x1="14" y1="14" x2="10" y2="18"></line></svg>,
    Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    Loader: () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loader-spinner text-white"><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>,
    MoreVertical: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>,
    Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
    FileCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 16 12"/></svg>,
    Clock: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    Star: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
    Edit: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>,
    FileText: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
    Image: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
    Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
};

// 📍 ตัวช่วยจัดการวันที่ เพื่อป้องกันปัญหา Timezone
const formatSafeDate = (val) => {
    if (!val) return '';
    const str = String(val);
    if (str.includes('T')) {
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        }
    }
    return str.split('T')[0];
};

const PRODUCT_COLORS = {
    'ES1,3300': 'bg-blue-500', '5500': 'bg-emerald-500', 'ES5/ES5.1': 'bg-purple-500',
    'S-villas': 'bg-amber-500', 'ES2': 'bg-pink-500', 'ES3': 'bg-indigo-500',
    'MOR-R': 'bg-rose-500', 'S7R4': 'bg-cyan-500', '7000': 'bg-teal-600', 'อื่นๆโปรดระบุ': 'bg-slate-500'
};

const getCardStyle = (task) => {
    const jobType = String(task.job_type || '').toLowerCase();
    const area = String(task.area || '').trim();
    const siteStr = String(task.site_name || '').toLowerCase();
    const eqStr = String(task.equipment_no || '').toLowerCase();
    const combinedStr = siteStr + ' ' + eqStr;

    const isLeave = jobType === 'leave' || combinedStr.includes('leave_') || combinedStr.includes('ลา') || combinedStr === 'ลา';

    if (jobType === 'public_holiday' || combinedStr.includes('hld_')) return { bg: '#D0021B', text: '#ffffff', isSpecial: true, isLeave: false };
    if (jobType === 'company_event' || combinedStr.includes('event_') || combinedStr.includes('meeting') || combinedStr.includes('office') || combinedStr.includes('อบรม') || combinedStr.includes('s&q') || combinedStr.includes('family')) return { bg: '#22c55e', text: '#ffffff', isSpecial: true, isLeave: false };
    if (isLeave) return { bg: '#eab308', text: '#ffffff', isSpecial: true, isLeave: true };
    if (area !== '' && area !== 'กรุงเทพและปริมณฑล' && area !== 'ไม่ระบุ') return { bg: '#f472b6', text: '#ffffff', isSpecial: false, isLeave: false };
    if (jobType === 'mod') return { bg: '#64748b', text: '#ffffff', isSpecial: false, isLeave: false };
    if (jobType.includes('re-ins') || jobType.includes('temporary') || jobType.includes('builder lift')) return { bg: '#fef08a', text: '#854d0e', isSpecial: false, isLeave: false };
    return { bg: '#e2e8f0', text: '#1e293b', isSpecial: false, isLeave: false };
};

const CalendarGrid = React.memo(({ daysInView, db, isAdmin, user, setShowLogin, setModal, setAlertMsg, handleDrop, handleDragOver, handleDragLeave, handleDragStart, setConfirmDialog, apiAction, setQuickAddType, filteredBookings, tableFontScale, columnZoom, specialFontScale, isExporting }) => {
    
    const taskMap = useMemo(() => {
        const map = {};
        filteredBookings.forEach(task => {
            if (String(task.status) === 'cancelled') return;
            const dateStr = formatSafeDate(task.date);
          
            if (!dateStr) return;
            const key = `${dateStr}_${task.inspector_name}`;
            if (!map[key]) map[key] = [];
            map[key].push(task);
        });
        return map;
    }, [filteredBookings]);

    const numInspectors = (db.inspectors || []).length || 1;
    const screenWidth = typeof window !== 'undefined' ? (window.innerWidth || 375) : 375;
    
    const colWidthPx = Math.floor(((screenWidth - 45) / 3) * columnZoom);
    
    const gridCols = isExporting 
        ? `60px repeat(${numInspectors}, 300px)` 
        : `45px repeat(${numInspectors}, ${colWidthPx}px)`;

    return (
        <div id="calendar-export-area" className={`calendar-grid ${isExporting ? 'export-mode' : ''}`} style={{ 
            gridTemplateColumns: gridCols,
            width: 'max-content',
            minWidth: '100%',
            backgroundColor: isExporting ? '#cbd5e1' : undefined
        }}>
            <div className={`sticky-corner font-bold flex items-center justify-center ${isExporting ? 'min-h-[60px]' : ''}`} style={{ fontSize: `${(isExporting ? 14 : 11) * tableFontScale}px` }}>DATE</div>
            {(db.inspectors || []).map((ins, i) => (
                <div key={i} className={`sticky-top flex items-center justify-center ${isExporting ? 'min-h-[60px] !py-3' : ''}`}>
                    <div className={`font-bold w-full text-center px-1 ${isExporting ? 'break-words leading-tight' : 'truncate'}`} style={{ fontSize: `${(isExporting ? 16 : 13) * tableFontScale}px` }}>
                        {ins.name || '-'}
                    </div>
                </div>
            ))}
            {daysInView.map((d, index) => {
             
                let headerClass = '';
                if (d.isGlobalHoliday) headerClass = 'is-sunday-col';
                else if (d.isGlobalEvent) headerClass = 'is-global-event-col';

                return (
                    <React.Fragment key={index}>
                        <div className={`sticky-left ${headerClass} ${d.isToday ? 'is-today-row' : ''} flex flex-col justify-center items-center ${isExporting ? 'px-2' : ''}`}>
                            {!d.isEmpty && (
        
                                <>
                                    <span className="font-black" style={{ fontSize: `${(isExporting ? 18 : 15) * tableFontScale}px`, lineHeight: 1.1 }}>{d.day}</span>
                           
                                    <span className="font-bold opacity-90" style={{ fontSize: `${(isExporting ? 13 : 10) * tableFontScale}px` }}>{d.weekday}</span>
                                </>
                            )}
                        </div>
                        {!d.isEmpty && (db.inspectors || []).map((ins, idx) => {
                            const cellKey = `${d.full}_${ins.name}`;
                            const cellTasks = taskMap[cellKey] || [];
                            const hasLeave = cellTasks.some(t => {
                                const jt = String(t.job_type || '').toLowerCase();
                                const eq = String(t.equipment_no || '').toLowerCase();
                                return jt === 'leave' || eq.startsWith('leave_') || eq.includes('ลา');
                            });

                            const isBlockedForNormalUser = d.isGlobalHoliday || d.isGlobalEvent || hasLeave;
                            let cellHolidayClass = '';
                            if (d.isGlobalHoliday) cellHolidayClass = 'is-holiday-cell';
                            else if (d.isGlobalEvent) cellHolidayClass = 'is-global-event-cell';

                            return (
                                <div key={idx} 
                                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, d.full, ins.name)}
                                    className={`grid-cell hover:opacity-90 flex flex-col ${cellHolidayClass} ${d.isToday && !cellHolidayClass ? 'is-today-row' : ''}`}
                                    onClick={() => {
                                        if (!isAdmin && isBlockedForNormalUser) return;
                                        if (!user) return setShowLogin(true);
                                        const todayLocalString = window.SAIS_UTILS?.getLocalDateString(new Date()) || new Date().toISOString().split('T')[0];
                                        if (d.full < todayLocalString && !isAdmin) return setAlertMsg('ไม่สามารถจองคิวงานย้อนหลังได้ครับ');
                                        if (isAdmin) {
                                            setModal({ type: 'admin_cell_action', data: { date: d.full, inspector_name: ins.name } });
                                        } else {
                                            setQuickAddType('job');
                                            setModal({ type: 'booking', data: { date: d.full, inspector_name: ins.name } });
                                        }
                                    }}>
                                    
                                    {/* 📍 เพิ่มการลากให้กับกิจกรรม/วันหยุดแบบกลุ่ม (Global) */}
                                    {d.isGlobalHoliday && cellTasks.length === 0 && d.globalHolidays.map((gh, ghi) => (
                                        <div key={'gh'+ghi} 
                                            draggable={isAdmin}
                                            onDragStart={(e) => handleDragStart(e, gh.id)}
                                            className={`holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`} 
                                            style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                            onClick={(e) => { e.stopPropagation(); isAdmin ? setModal({ type: 'task_action', data: gh }) : setModal({ type: 'detail', data: gh }); }}>
                                            {gh.site_name}
                                        </div>
                                    ))}

                                    {/* 📍 เพิ่มการลากให้กับกิจกรรมแบบกลุ่ม (Global) */}
                                    {d.isGlobalEvent && !hasLeave && cellTasks.length === 0 && d.globalEvents.map((ge, gei) => (
                                        <div key={'ge'+gei} 
                                            draggable={isAdmin}
                                            onDragStart={(e) => handleDragStart(e, ge.id)}
                                            className={`holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`} 
                                            style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                            onClick={(e) => { e.stopPropagation(); isAdmin ? setModal({ type: 'task_action', data: ge }) : setModal({ type: 'detail', data: ge }); }}>
                                            {ge.site_name}
                                        </div>
                                    ))}
                                    
                                    {cellTasks.map((task, tIdx) => {
                                        const styleObj = getCardStyle(task);
                                        const isSingleCard = cellTasks.length === 1;

                                        const fullText = !styleObj.isSpecial ? `${task.equipment_no || ''} ${task.unit_no || ''} ${task.site_name || ''}` : `${task.site_name || ''}`;
                                        const textLen = fullText.length;
                                        
                                        let dynamicScale = 1.0;
                                        if (textLen <= 6) dynamicScale = 1.6;       
                                        else if (textLen <= 12) dynamicScale = 1.3; 
                                        else if (textLen <= 20) dynamicScale = 1.1;
                                        else if (textLen > 35) dynamicScale = 0.85; 

                                        return (
                                            <div key={task.id || tIdx} 
                                                draggable={isAdmin} 
                                                onDragStart={(e) => handleDragStart(e, task.id)} 
                                                className={`task-content relative w-full flex items-center justify-center p-1 rounded-md ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${isSingleCard ? 'h-full min-h-[40px]' : 'flex-1 min-h-[26px] border-b border-white/25'} ${isExporting ? '!overflow-visible !py-2 !min-h-[50px]' : 'overflow-hidden'}`}
                                                style={{ backgroundColor: styleObj.bg, color: styleObj.text }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    if (isAdmin || user?.username === task.created_by) {
                                                        setModal({ type: 'task_action', data: task });
                                                    } else {
                                                        setModal({ type: 'detail', data: task });
                                                    }
                                                }}>
                                                
                                                <div className={`w-full flex flex-col justify-center items-center text-center`}>
                                                  {styleObj.isLeave ? (
                                                        <div className="font-black flex items-center justify-center leading-none" style={{ fontSize: `${(isSingleCard ? (isExporting ? 46 : 36) : (isExporting ? 32 : 24)) * specialFontScale}px` }}>
                                                            ลา
                                                        </div>
                                                    ) : isSingleCard ? (
                                                        <div className="format-multi-line flex flex-col justify-center items-center w-full !text-center">
                                                            {!styleObj.isSpecial ? (
                                                                <>
                                                                    <div className="leading-tight opacity-90 font-bold" style={{ fontSize: `${(isExporting ? 12 : 10) * dynamicScale * tableFontScale}px` }}>{task.equipment_no} <span className="opacity-60">/</span> {task.product_line || '-'} <span className="opacity-60">/</span> {task.unit_no}</div>
                                                                    <div className={`leading-tight font-black mt-[2px] w-full break-words`} style={{ fontSize: `${(isExporting ? 14 : 11) * dynamicScale * tableFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }}>{task.site_name}</div>
                                                                </>
                                                            ) : (
                                                                <div className={`whitespace-pre-wrap leading-tight font-black w-full break-words`} style={{ fontSize: `${(isExporting ? 15 : 12) * dynamicScale * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'pre-wrap' }}>{task.site_name}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className={`format-single-line font-black leading-tight w-full !text-center`} style={{ fontSize: `${(isExporting ? 12 : 10) * dynamicScale * (styleObj.isSpecial ? specialFontScale : tableFontScale)}px`, whiteSpace: isExporting ? 'normal' : 'nowrap', overflow: isExporting ? 'visible' : 'hidden' }}>
                                                            {!styleObj.isSpecial ? `${task.equipment_no} / ${task.product_line || '-'} / ${task.site_name}` : task.site_name}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
});

const App = () => {
    const SCRIPT_URL = window?.SAIS_CONFIG?.SCRIPT_URL || "";
    const ADMIN_USERNAME = window?.SAIS_CONFIG?.ADMIN_USERNAME || "jiraphong2227";
    const utils = window?.SAIS_UTILS || {};

    const [db, setDb] = useState({ bookings: [], inspectors: [], notifications: [] });
    const [adminDb, setAdminDb] = useState({ users: [], logs: [], all_bookings: [] });
    const [hasLoadedAdmin, setHasLoadedAdmin] = useState(false);
    const dbRef = useRef(db);
    useEffect(() => { dbRef.current = db; }, [db]);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [period, setPeriod] = useState(new Date().getDate() > 15 ? 1 : 0); 
    const todayLocalString = window?.SAIS_UTILS?.getLocalDateString(new Date()) || new Date().toISOString().split('T')[0];
    const [lastSyncTime, setLastSyncTime] = useState(new Date());
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    
    // 📍 1. เพิ่มตัวแปรจัดการผู้ตรวจ
    const [editInspector, setEditInspector] = useState(null);

    const [pullY, setPullY] = useState(0);
    const touchStartY = useRef(0);
    const [user, setUser] = useState(() => { 
        try { 
            const saved = localStorage.getItem('sais_user'); 
            const savedTime = localStorage.getItem('sais_session_time');
            if (saved && savedTime) {
                if (Date.now() - parseInt(savedTime) > 86400000) {
                    localStorage.removeItem('sais_user'); localStorage.removeItem('sais_session_time');
                    return null;
                }
                return JSON.parse(saved); 
            }
            return null;
        } catch(e) { return null; } 
    });
    
    const [initialLoad, setInitialLoad] = useState(true);
    const [loadingMsg, setLoadingMsg] = useState(null);
    const [uploadingDoc, setUploadingDoc] = useState({ layout: false, wiring: false, precheck: false });

    const [alertMsg, setAlertMsg] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [promptDialog, setPromptDialog] = useState(null);
    const [successModal, setSuccessModal] = useState(null); 

    const [currentView, setCurrentView] = useState('calendar');
    const [modal, setModal] = useState(null); 
    const [showLogin, setShowLogin] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false); 
    const [isForgotMode, setIsForgotMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityTab, setActivityTab] = useState('notif');
    const [showManual, setShowManual] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [tableFontScale, setTableFontScale] = useState(() => {
        try { const saved = localStorage.getItem('sais_table_font_scale'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; }
    });
    const [specialFontScale, setSpecialFontScale] = useState(() => {
        try { const saved = localStorage.getItem('sais_special_font_scale'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; }
    });
    const [columnZoom, setColumnZoom] = useState(() => {
        try { const saved = localStorage.getItem('sais_column_zoom'); return saved ? parseFloat(saved) : 1.0; } catch(e) { return 1.0; }
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [filterArea, setFilterArea] = useState('All');
    
    const [areaSelection, setAreaSelection] = useState('กรุงเทพและปริมณฑล');
    const [jobTypeSelection, setJobTypeSelection] = useState('New');
    const [productLineSelection, setProductLineSelection] = useState('ES1,3300');
    const [adminTab, setAdminTab] = useState('menu'); 
    const [adminBookingsLimit, setAdminBookingsLimit] = useState(20);
    const [myBookingsTab, setMyBookingsTab] = useState('pending');
    const [myBookingsLimit, setMyBookingsLimit] = useState(20);
    const [actionMenuId, setActionMenuId] = useState(null); 
    const [logsLimit, setLogsLimit] = useState(20);
    const [logSearchQuery, setLogSearchQuery] = useState('');
    const [quickAddType, setQuickAddType] = useState('job');
    const [leaveStartDate, setLeaveStartDate] = useState('');
    const [leaveEndDate, setLeaveEndDate] = useState('');
    const [leaveInspector, setLeaveInspector] = useState('');
    const [leaveType, setLeaveType] = useState('ลาพักร้อน');
    const [customLeaveType, setCustomLeaveType] = useState(''); 
    const [leaveStartTime, setLeaveStartTime] = useState('');
    const [leaveEndTime, setLeaveEndTime] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventInspector, setEventInspector] = useState('ALL');
    const [holidayStartDate, setHolidayStartDate] = useState('');
    const [holidayEndDate, setHolidayEndDate] = useState('');

    const [selectedLeavesToDelete, setSelectedLeavesToDelete] = useState([]);
    const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);
    const [selectedHolidaysToDelete, setSelectedHolidaysToDelete] = useState([]);

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const [showParticipantDropdown, setShowParticipantDropdown] = useState(false);
    const [eventParticipants, setEventParticipants] = useState([]);

    const getDiffLog = (oldData, newData, actionUser) => {
        const site = newData.site_name || oldData?.site_name || '-';
        const eq = newData.equipment_no || oldData?.equipment_no || '-';
        const pl = newData.product_line || oldData?.product_line || '-';
        const jt = newData.job_type || oldData?.job_type || '-';
        const userAct = actionUser || '-';
        if (!oldData) {
            return `[จองคิวใหม่]\nโดย: ${userAct}\nโครงการ: ${site}\nEq No.: ${eq}\nProduct: ${pl}\nประเภทงาน: ${jt}\nผู้ตรวจ: ${newData.inspector_name || '-'}\nวันที่: ${newData.date || '-'}`;
        }
        
        let changes = [];
        const labels = {
            date: 'วันที่', inspector_name: 'ผู้ตรวจสอบ', site_name: 'ชื่อโครงการ',
            equipment_no: 'Eq No.', unit_no: 'Unit', job_type: 'ประเภทงาน', 
            area: 'พื้นที่', tel: 'เบอร์โทร', product_line: 'Product',
            layout_doc: 'เอกสาร Layout', wiring_doc: 'เอกสาร Wiring', precheck_doc: 'เอกสาร Precheck'
        };
        for (let key in labels) {
            let oldVal = String(oldData[key] || '').trim();
            let newVal = String(newData[key] || '').trim();
            if (oldVal !== newVal) {
                if (oldVal === 'false') oldVal = 'ยังไม่ส่ง';
                if (oldVal === 'true') oldVal = 'ส่งแล้ว';
                if (newVal === 'false') newVal = 'ยังไม่ส่ง';
                if (newVal === 'true') newVal = 'ส่งแล้ว';
                changes.push(`• ${labels[key]}: [${oldVal || '-'}] ➡️ [${newVal || '-'}]`);
            }
        }
        return changes.length > 0 ? `[แก้ไขข้อมูล]\nโดย: ${userAct}\nโครงการ: ${site}\nEq No.: ${eq}\nProduct: ${pl}\nประเภทงาน: ${jt}\nรายละเอียดที่แก้ไข:\n${changes.join('\n')}` : 'บันทึกการแก้ไขโดยไม่มีการเปลี่ยนข้อมูลหลัก';
    };

    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const calculateTimeDuration = (start, end) => {
        if (!start || !end) return null;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        let diffMins = (eh * 60 + em) - (sh * 60 + sm);
        if (diffMins < 0) return 0;
        return diffMins; 
    };

    const formatDuration = (totalMins) => {
        if (!totalMins || totalMins <= 0) return '';
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        if (h > 0 && m > 0) return `${h} ชม. ${m} นาที`;
        if (h > 0) return `${h} ชม.`;
        return `${m} นาที`;
    };

    const leaveMins = calculateTimeDuration(leaveStartTime, leaveEndTime) || 0;
    const eventMins = calculateTimeDuration(eventStartTime, eventEndTime) || 0;

    useEffect(() => {
        if (successModal) {
            const timer = setTimeout(() => { setSuccessModal(null); }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successModal]);

    useEffect(() => { localStorage.setItem('sais_table_font_scale', tableFontScale.toString()); }, [tableFontScale]);
    useEffect(() => { localStorage.setItem('sais_special_font_scale', specialFontScale.toString()); }, [specialFontScale]);
    useEffect(() => { localStorage.setItem('sais_column_zoom', columnZoom.toString()); }, [columnZoom]);

    const updateTableFontScale = (adjustment) => { setTableFontScale(prev => { const newVal = Math.max(0.3, Math.min(5.0, prev + adjustment)); return Math.round(newVal * 10) / 10; }); };
    const updateSpecialFontScale = (adjustment) => { setSpecialFontScale(prev => { const newVal = Math.max(0.3, Math.min(5.0, prev + adjustment)); return Math.round(newVal * 10) / 10; }); };
    const updateColumnZoom = (adjustment) => { setColumnZoom(prev => { const newVal = Math.max(0.3, Math.min(3.0, prev + adjustment)); return Math.round(newVal * 10) / 10; }); };

    const [isNavVisible, setIsNavVisible] = useState(true);
    useEffect(() => {
        let navTimer;
        const handleUserActivity = () => { setIsNavVisible(true); clearTimeout(navTimer); navTimer = setTimeout(() => setIsNavVisible(false), 3500); };
        window.addEventListener('touchstart', handleUserActivity); window.addEventListener('click', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity, true); window.addEventListener('mousemove', handleUserActivity);
        handleUserActivity(); 
        return () => {
            window.removeEventListener('touchstart', handleUserActivity); window.removeEventListener('click', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity, true); window.removeEventListener('mousemove', handleUserActivity);
            clearTimeout(navTimer);
        }
    }, []);

    const changePeriod = (dir) => {
        if (dir === 'next') {
            if (period === 0) setPeriod(1);
            else { setPeriod(0); setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)); }
        } else {
            if (period === 1) setPeriod(0);
            else { setPeriod(1); setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)); }
        }
    };

    const handleMapChange = (val) => {
        if (utils && typeof utils.getMapEmbedUrl === 'function') { setLiveMapUrl(utils.getMapEmbedUrl(val) || ''); } 
        else { setLiveMapUrl(''); }
    };

    const handleExportJPG = () => {
        setShowSettings(false);
        setCurrentView('calendar');
        setLoadingMsg('กำลังสร้างและปรับความคมชัดภาพตาราง... (รอสักครู่)');
        setIsExporting(true);
        setTimeout(() => {
            const targetNode = document.getElementById('calendar-export-area');
            if(targetNode) {
                html2canvas(targetNode, { 
                    scale: 2, 
                    useCORS: true, 
                    backgroundColor: '#f8fafc',
                    windowWidth: targetNode.scrollWidth, 
                    windowHeight: targetNode.scrollHeight 
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `SAIS_Schedule_${currentDate.getFullYear()}_${currentDate.getMonth()+1}_P${period+1}.jpg`;
                    link.href = canvas.toDataURL('image/jpeg', 0.9);
                    link.click();
                    setIsExporting(false); setLoadingMsg(null); setSuccessModal('บันทึกรูปภาพสำเร็จ');
                }).catch(err => {
                    setIsExporting(false); setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาดในการบันทึกภาพ');
                });
            } else {
                setIsExporting(false);
                setLoadingMsg(null); setAlertMsg('ไม่พบตาราง');
            }
        }, 1500); 
    };

    const handleBulkDelete = async (type, ids) => {
        if (ids.length === 0) return;
        setConfirmDialog({
            msg: `ยืนยันลบข้อมูลที่เลือกทั้ง ${ids.length} รายการ?`,
            onConfirm: async () => {
                setConfirmDialog(null); setLoadingMsg('กำลังลบข้อมูลแบบกลุ่ม...');
                try {
                    const logDetail = `[ลบข้อมูลแบบกลุ่ม]\nหมวดหมู่: ${type}\nจำนวน: ${ids.length} รายการ`;
                    const res = await utils.fetchWithRetry(SCRIPT_URL, { 
                        method: 'POST', body: JSON.stringify({ action: 'delete_multiple', ids: ids, user: user.username, reason: logDetail }) 
                    });
                    if (res.status === 'ok') {
                        if (type === 'leave') setSelectedLeavesToDelete([]);
                        if (type === 'event') setSelectedEventsToDelete([]);
                        if (type === 'holiday') setSelectedHolidaysToDelete([]);
                        await fetchCoreData(true, null); 
                        setLoadingMsg(null);
                        setSuccessModal(`ลบสำเร็จ ${res.deleted} รายการ`);
                    } else { 
                        setLoadingMsg(null);
                        setAlertMsg('เกิดข้อผิดพลาดในการลบ'); 
                    }
                } catch(e) { 
                    setLoadingMsg(null);
                    setAlertMsg('การเชื่อมต่อขัดข้อง'); 
                }
            }
        });
    };
    
    const generateDates = (startStr, endStr, omitSunday = true) => {
        if (!startStr || !endStr) return [];
        let start = new Date(`${startStr}T12:00:00`); let end = new Date(`${endStr}T12:00:00`);
        if (start > end) return [];
        let dates = [];
        let current = new Date(start);
        while (current <= end) {
            const localDateStr = utils.getLocalDateString ? utils.getLocalDateString(current) : current.toISOString().split('T')[0];
            const isSunday = current.getDay() === 0;
            const isGlobalHoliday = (db.bookings || []).some(b => b.date && formatSafeDate(b.date) === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY');
            if (!omitSunday || (!isSunday && !isGlobalHoliday)) dates.push(localDateStr);
            current.setDate(current.getDate() + 1);
        } return dates;
    };

    const leaveDates = useMemo(() => generateDates(leaveStartDate, leaveEndDate, true), [leaveStartDate, leaveEndDate, db.bookings]);
    const eventDates = useMemo(() => generateDates(eventStartDate, eventEndDate, true), [eventStartDate, eventEndDate, db.bookings]);
    const holidayDates = useMemo(() => generateDates(holidayStartDate, holidayEndDate, false), [holidayStartDate, holidayEndDate]);
    const isAdmin = useMemo(() => user?.username === ADMIN_USERNAME || user?.role === 'admin', [user]);
    const unreadNotifs = useMemo(() => (db.notifications || []).filter(n => (n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')) && String(n.isRead) !== 'true'), [db.notifications, user, isAdmin]);

    const daysInView = useMemo(() => {
        if(!utils.getLocalDateString) return [];
        const days = [];
        const year = currentDate.getFullYear(); const month = currentDate.getMonth(); const lastDay = new Date(year, month + 1, 0).getDate();
        const start = period === 0 ? 1 : 16; const end = period === 0 ? 15 : lastDay; 
        
        for (let i = 0; i < 16; i++) {
            const d = start + i;
            if (d <= end) {
                const date = new Date(year, month, d); const localDateStr = utils.getLocalDateString(date);
                const globalHolidayItems = (db.bookings || []).filter(b => b.date && formatSafeDate(b.date) === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY' && String(b.status) !== 'cancelled');
                const globalEventItems = (db.bookings || []).filter(b => b.date && formatSafeDate(b.date) === localDateStr && String(b.inspector_name) === 'SYSTEM_EVENT' && String(b.status) !== 'cancelled');
                
                days.push({ 
                    full: localDateStr, day: d, weekday: date.toLocaleDateString('en-US', { weekday: 'short' }), 
                    isSunday: date.getDay() === 0, 
                    isGlobalHoliday: globalHolidayItems.length > 0 || date.getDay() === 0, globalHolidays: globalHolidayItems,
                    isGlobalEvent: globalEventItems.length > 0, globalEvents: globalEventItems,
                    isToday: localDateStr === todayLocalString, isEmpty: false 
                });
            } else { days.push({ isEmpty: true }); }
        }
        return days;
    }, [currentDate, period, db.bookings, todayLocalString]);

    useEffect(() => {
        const load = async () => {
            let currentCache = null;
            if (window.DB_CACHE) {
                try {
                    currentCache = await window.DB_CACHE.getItem('sais_core_db');
                    if (currentCache && currentCache.bookings) {
                        setDb(currentCache);
                        setInitialLoad(false); 
                    }
                } catch(e) {}
            }
            
            const isFirstLoad = !currentCache || !currentCache.bookings || currentCache.bookings.length === 0;
            await fetchCoreData(isFirstLoad, currentCache);
            setInitialLoad(false); 
        }
        if(SCRIPT_URL) load();

        const timer = setInterval(() => { 
            if (document.visibilityState === 'visible' && !modal && !showLogin && !showActivityModal && !alertMsg && !confirmDialog && !promptDialog && !loadingMsg && !successModal && SCRIPT_URL && !isExporting) {
                fetchCoreData(false, dbRef.current);
            }
        }, 180000); 
        return () => clearInterval(timer);
    }, [modal, showLogin, showActivityModal, alertMsg, confirmDialog, promptDialog, loadingMsg, successModal, SCRIPT_URL, isExporting]);

    const fetchCoreData = async (needPast = false, currentCache = null) => {
        if (!SCRIPT_URL) return;
        try {
            const res = await fetch(SCRIPT_URL, { 
                method: 'POST', 
                body: JSON.stringify({ action: 'sync_core', fetch_past: needPast }) 
            });
            const result = await res.json();
            
            if (result.status === 'ok') {
                let finalDb = result.data;
                if (!needPast && currentCache && currentCache.bookings) {
                    const today = new Date();
                    today.setHours(0,0,0,0);
                    
                    const fetchedIds = new Set(result.data.bookings.map(b => b.id));

                    const pastCachedBookings = currentCache.bookings.filter(b => {
                        if (!b.date) return false;
                        const bDate = new Date(b.date);
                        return bDate < today && !fetchedIds.has(b.id);
                    });
                    finalDb.bookings = [...pastCachedBookings, ...result.data.bookings];
                }
                setDb(finalDb);
                setLastSyncTime(new Date()); 
                if (window.DB_CACHE) window.DB_CACHE.setItem('sais_core_db', finalDb);
            }
        } catch (e) { console.error("Core Fetch Error"); }
    };

    const fetchAdminData = async () => {
        if (!SCRIPT_URL) return;
        try {
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'sync_admin' }) });
            const result = await res.json();
            if (result.status === 'ok') { setAdminDb(result.data); setHasLoadedAdmin(true); }
        } catch (e) { console.error("Admin Fetch Error"); }
    };

    const handleTabChange = (view) => {
        setCurrentView(view);
        if ((view === 'admin' || view === 'search') && !hasLoadedAdmin) fetchAdminData();
    };

    const apiAction = async (payload, customLoadMsg = 'กำลังบันทึกข้อมูล...') => {
        if (!SCRIPT_URL) return false;
        setLoadingMsg(customLoadMsg);
        try {
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
            const text = await res.text(); 
            try {
                const result = JSON.parse(text);
                if (result.status === 'ok') { 
                    await fetchCoreData(true, null);
                    if(hasLoadedAdmin) await fetchAdminData();
                    setLoadingMsg(null); 
                    return true;
                } else { 
                    setLoadingMsg(null);
                    setAlertMsg(result.message || 'ไม่ทราบสาเหตุ'); 
                    return false; 
                }
            } catch(e) { 
                setLoadingMsg(null);
                setAlertMsg('ข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่'); 
                return false; 
            }
        } catch (e) { 
            setLoadingMsg(null);
            setAlertMsg('การเชื่อมต่อเครือข่ายขัดข้อง'); 
            return false; 
        }
    };

    const handleTouchStart = (e) => { if (scrollRef.current && scrollRef.current.scrollTop === 0) touchStartY.current = e.touches[0].clientY; };
    const handleTouchMove = (e) => {
        if (scrollRef.current && scrollRef.current.scrollTop === 0 && touchStartY.current > 0) {
            const diff = e.touches[0].clientY - touchStartY.current;
            if (diff > 0 && diff < 80) setPullY(diff);
        }
    };

    const handleTouchEnd = async () => {
        if (pullY > 50 && !isRefreshing) { setIsRefreshing(true);
            setPullY(50); await fetchCoreData(false, dbRef.current); setIsRefreshing(false); }
        setPullY(0); touchStartY.current = 0;
    };

    const handleCancelBooking = (booking) => {
        if(!booking?.id) return;
        setConfirmDialog({
            msg: "ยืนยันลบข้อมูลนี้ใช่หรือไม่?",
            onConfirm: async () => {
                setConfirmDialog(null);
                const logDetail = `[ลบรายการ (Admin)]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nProduct: ${booking.product_line || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
                const ok = await apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail }, 'กำลังลบ...');
                if(ok) { setSuccessModal('ลบสำเร็จ'); setModal(null); }
            }
        });
    };

    const handleCancelJob = (booking) => {
        if(!booking?.id) return;
        const isPastDate = booking.date && formatSafeDate(booking.date) < todayLocalString;
        if (isPastDate && !isAdmin) return setAlertMsg('🔒 ไม่อนุญาตให้ยกเลิกคิวงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        setPromptDialog({
            msg: "โปรดระบุเหตุผลในการยกเลิกคิวงานนี้:",
            onSubmit: (reason) => {
                const logDetail = `[ยกเลิกคิวงาน]\nโดย: ${user?.username || '-'}\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nProduct: ${booking.product_line || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nเหตุผล: ${reason || 'ไม่ระบุ'}`;
                apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail }, 'กำลังยกเลิกคิวงาน...').then(ok => {
                    if(ok) { setModal(null); setActionMenuId(null); setSuccessModal('ยกเลิกคิวสำเร็จ'); }
                });
            }
        });
    };

    const handleToggleDoc = async (bookingId, docType, currentValue) => {
        const newValue = String(currentValue) === 'true' ? 'false' : 'true';
        setDb(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === bookingId ? { ...b, [docType]: newValue } : b) }));
        const docName = docType === 'layout_doc' ? 'Layout' : docType === 'wiring_doc' ? 'Wiring' : 'Precheck';
        const statusName = newValue === 'true' ? 'อนุมัติ (ได้รับแล้ว)' : 'ยกเลิก (ยังไม่ได้รับ)';
        const targetJob = db.bookings.find(b => b.id === bookingId);
        const logDetail = `[อัปเดตเอกสาร]\nโดย: ${user?.username}\nเปลี่ยนสถานะเอกสาร ${docName} เป็น ➡️ "${statusName}"\nEq No.: ${targetJob?.equipment_no}\nโครงการ: ${targetJob?.site_name}`;
        await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'update_booking', id: bookingId, user: user.username, [docType]: newValue, reason: logDetail }) });
    };

    const markNotifAsRead = async (id) => {
        if (!SCRIPT_URL) return;
        setDb(prev => ({ ...prev, notifications: prev.notifications.map(n => n.id === id ? {...n, isRead: 'true'} : n) }));
        fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'read_notification', id: id }) });
    };

    const handleImageUpload = async (e, docType) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return setAlertMsg('กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น');
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true })); setLoadingMsg('กำลังบีบอัดและอัปโหลดรูปภาพ...');
        try {
            const base64Img = await utils.compressImage(file);
            const res = await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'upload_image', base64: base64Img, mimeType: file.type, fileName: `SAIS_${docType}_${Date.now()}.jpg` }) });
            if (res.status === 'ok') { document.getElementById(`${docType}_img_input`).value = res.fileUrl; setSuccessModal(`อัปโหลดเอกสาร ${docType} สำเร็จ`);
            } 
            else { setAlertMsg('อัปโหลดไม่สำเร็จ'); }
        } catch(err) { setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลด'); }
        setLoadingMsg(null); setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    const handleDragStart = (e, taskId) => { e.dataTransfer.setData('taskId', taskId); };
    const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
    const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };
    
    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (!isAdmin) return setAlertMsg('เฉพาะแอดมินที่ย้ายคิวได้');
        const taskId = e.dataTransfer.getData('taskId');
        const task = db.bookings.find(b => String(b.id) === String(taskId));
        if(!task) return;

        const jobTypeLower = String(task.job_type).toLowerCase();
        const isSpecial = jobTypeLower.includes('leave') || jobTypeLower.includes('event') || jobTypeLower.includes('holiday');

        if (!isSpecial) {
            const isDup = db.bookings.some(b => formatSafeDate(b.date) === targetDate && String(b.equipment_no) === String(task.equipment_no) && b.id !== taskId);
            if(isDup) return setAlertMsg('Eq No. นี้ถูกจองไปแล้วในวันเดียวกัน');
        }

        let finalInspector = targetInspector;
        if (task.inspector_name === 'SYSTEM_EVENT') finalInspector = 'SYSTEM_EVENT';
        if (task.inspector_name === 'SYSTEM_HOLIDAY') finalInspector = 'SYSTEM_HOLIDAY';

        setConfirmDialog({
            msg: `ย้ายคิว ${isSpecial ? 'กิจกรรม/ลา' : 'Eq'}: ${task.equipment_no || task.site_name}\nไปยังวันที่ ${targetDate}?`,
            onConfirm: async () => {
                setConfirmDialog(null);
                const logDetail = `[ย้ายคิวงาน/กิจกรรม]\nโดย: ${user?.username || '-'}\nEq/หัวข้อ: ${task.equipment_no || task.site_name}\nโครงการ: ${task.site_name || '-'}\nรายละเอียดการย้าย:\n• วันที่: [${task.date ? formatSafeDate(task.date) : ''}] ➡️ [${targetDate}]\n• ผู้ตรวจ: [${task.inspector_name}] ➡️ [${finalInspector}]`;
                const ok = await apiAction({ action: 'update_booking', id: taskId, date: targetDate, inspector_name: finalInspector, user: user.username, reason: logDetail }, 'กำลังย้ายข้อมูล...');
                if(ok) setSuccessModal('ย้ายคิวสำเร็จ');
            }
        });
    };

    const filteredBookings = useMemo(() => { return (db.bookings || []).filter(b => { if (filterArea === 'All') return true; return String(b.area || '') === filterArea; }); }, [db.bookings, filterArea]);

    // 📍 1. ดักฟังก์ชันแก้ไขกิจกรรม/วันหยุด (ป้องกัน Timezone ผิดพลาด และแก้บัคคอลัมน์เกิน)
    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newTitle = fd.get('site_name'); const newInspector = fd.get('inspector_name'); const newDate = fd.get('date');
        const logDetail = `[แก้ไขคิวพิเศษ]\nโดย: ${user?.username}\nเปลี่ยนวันที่เป็น ${newDate}\nผู้ตรวจ: ${newInspector}\nหัวข้อ: ${newTitle}`;
        
        // 📍 FIX: ส่งข้อมูลเดิมทั้งหมดกลับไปด้วย ป้องกันเซิร์ฟเวอร์หาค่าคอลัมน์ไม่เจอ
        const payload = { 
            ...modal.data, 
            action: 'update_booking', 
            id: modal.data.id, 
            site_name: newTitle, 
            inspector_name: newInspector, 
            date: newDate, 
            user: user.username, 
            reason: logDetail 
        };
        const ok = await apiAction(payload, 'กำลังอัปเดตข้อมูล...');
        if(ok) { setModal(null); setSuccessModal('อัปเดตสำเร็จ'); }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : areaSelection;
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : productLineSelection;
        const isFromAdminPanel = modal?.data?.isAdminOverride === true;
        const targetInspector = isFromAdminPanel ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isFromAdminPanel ? fd.get('admin_date_target') : modal?.data?.date;
        const isPastDate = targetDate < todayLocalString;
        
        if (isPastDate && !isAdmin && modal?.data?.id) return setAlertMsg('🔒 ไม่อนุญาตให้แก้ไขข้อมูลงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        if (!targetInspector || !targetDate) return setAlertMsg('ข้อมูลวันหรือผู้ตรวจไม่ครบถ้วน');
        
        if (quickAddType !== 'job') {
            let p_jobType = '', p_siteName = fd.get('site_name'), p_eq = '';
            const sTime = fd.get('start_time'); const eTime = fd.get('end_time');
            if (sTime && eTime && sTime >= eTime) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
            if (sTime && eTime) p_siteName = `${sTime}-${eTime} ${p_siteName}`;

            if (quickAddType === 'leave') {
                p_jobType = 'leave';
                if (fd.get('leave_type') === 'อื่นๆโปรดระบุ') p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('custom_leave');
                else p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('leave_type');
                p_eq = `LEAVE_${Date.now()}`;
            } else if (quickAddType === 'event') {
                p_jobType = 'company_event';
                p_eq = `EVENT_${Date.now()}`;
            } else if (quickAddType === 'holiday') {
                p_jobType = 'public_holiday';
                p_eq = `HLD_${Date.now()}`;
            }

            const logDetail = `[บันทึก${quickAddType}]\nโดย: ${user?.username}\nวันที่: ${targetDate}\nหัวข้อ: ${p_siteName}\nผู้ตรวจ: ${targetInspector}`;
            const payload = { action: 'create_multiple_bookings', dates: [targetDate], inspector_name: quickAddType === 'holiday' ? 'SYSTEM_HOLIDAY' : targetInspector, job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, user: user.username, reason: logDetail };
            
            const ok = await apiAction(payload, `กำลังบันทึก${quickAddType}...`);
            if(ok) { setModal(null); setSuccessModal('บันทึกสำเร็จ'); }
            return;
        }

        const isDup = (db.bookings || []).some(b => {
            const sameDate = b.date && formatSafeDate(b.date) === targetDate;
            if (!sameDate) return false;
            if (b.id === modal?.data?.id) return false;
            if (String(b.inspector_name) === 'SYSTEM_HOLIDAY') return false;
            if (String(b.status) === 'cancelled') return false;
            if (String(b.equipment_no) === String(data.equipment_no)) return true;
            if (!isAdmin && String(b.inspector_name) === targetInspector) return true;
            return false;
        });

        if (isDup) return setAlertMsg(isAdmin ? `เลข Eq No. ${data.equipment_no} ถูกจองไปแล้วในวันนี้` : 'ผู้ตรวจคิวเต็มแล้วในวันนี้');

        // 📍 3. FIX: ตรวจสอบสิทธิ์ Product Line (Certificate) ของผู้ตรวจ
        const targetInspectorObj = (db.inspectors || []).find(i => i.name === targetInspector);
        if (targetInspectorObj && targetInspectorObj.product_lines) {
            const certs = targetInspectorObj.product_lines.split(',').map(s => s.trim());
            // ถ้ามีค่าว่างแปลว่ายังไม่ได้ตั้งค่า ให้ถือว่าทำได้หมด แต่ถ้าตั้งค่าไว้ ต้องตรวจสอบ
            if (certs.length > 0 && certs[0] !== '' && !certs.includes(finalProductLine)) {
                return setAlertMsg(`ผู้ตรวจ "${targetInspector}" ไม่ได้รับสิทธิ์ให้ตรวจ Product Line: ${finalProductLine}`);
            }
        }

        if (!isAdmin && !/^\d{10}$/.test(data.tel)) return setAlertMsg('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก');
        if (isAdmin && data.tel && !/^\d{10}$/.test(data.tel)) return setAlertMsg('เบอร์โทรศัพท์ต้องมี 10 หลัก (หรือเว้นว่างไว้)');

        const jStart = fd.get('job_start_time'); const jEnd = fd.get('job_end_time');
        if (jStart && jEnd && jStart >= jEnd) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
        let finalSiteName = data.site_name;
        if (jStart && jEnd) finalSiteName = `${jStart}-${jEnd} ${finalSiteName}`;

        const payload = {
            action: modal?.data?.id ? 'update_booking' : 'create_booking',
            ...data, site_name: finalSiteName, tel: String(data.tel || ''), area: finalArea, job_type: jobTypeSelection, product_line: finalProductLine,
            id: modal?.data?.id, inspector_name: targetInspector, date: targetDate, user: user.username,
            layout_img: fd.get('layout_img') || modal?.data?.layout_img || '',
            wiring_img: fd.get('wiring_img') || modal?.data?.wiring_img || '',
            precheck_img: fd.get('precheck_img') || modal?.data?.precheck_img || ''
        };

        if (isAdmin) { 
            payload.layout_doc = data.layout_doc ? 'true' : 'false';
            payload.wiring_doc = data.wiring_doc ? 'true' : 'false'; 
            payload.precheck_doc = data.precheck_doc ? 'true' : 'false';
        } else if (modal?.data?.id) { 
            payload.layout_doc = String(modal?.data?.layout_doc || 'false');
            payload.wiring_doc = String(modal?.data?.wiring_doc || 'false'); 
            payload.precheck_doc = String(modal?.data?.precheck_doc || 'false');
        } else { 
            payload.layout_doc = 'false';
            payload.wiring_doc = 'false'; payload.precheck_doc = 'false';
        }

        payload.reason = getDiffLog(modal?.data?.id ? modal.data : null, payload, user?.username);
        const ok = await apiAction(payload, modal?.data?.id ? 'กำลังอัปเดตข้อมูล...' : 'กำลังบันทึกคิวงาน...');
        if (ok) { 
            setSuccessModal(modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!');
            if (isAdmin && !modal?.data?.id && fd.get('keep_open')) {
                e.target.equipment_no.value = '';
                if (e.target.unit_no) e.target.unit_no.value = '';
                e.target.equipment_no.focus(); 
            } else {
                setModal(null);
                setAreaSelection('กรุงเทพและปริมณฑล'); 
                setJobTypeSelection('New'); 
                setProductLineSelection('ES1,3300'); 
                setLiveMapUrl('');
            }
        }
    };

    const handleLogout = () => {
        setConfirmDialog({
            msg: 'ยืนยันการออกจากระบบใช่หรือไม่?',
            onConfirm: async () => {
                setConfirmDialog(null); setLoadingMsg('กำลังออกจากระบบ...'); setUser(null);
                try {
                    localStorage.clear(); sessionStorage.clear();
                    if ('caches' in window) caches.keys().then(names => Promise.all(names.map(n => caches.delete(n))));
                } catch (error) {} finally { window.location.replace(window.location.pathname + '?logout=' + new Date().getTime()); }
            }
        });
    };

    if (!SCRIPT_URL) return <div className="h-screen w-full flex items-center justify-center flex-col gap-4 p-8 text-center"><div className="text-4xl text-red-500"><Icons.Alert /></div><h2 className="text-xl font-bold text-slate-800">เกิดข้อผิดพลาด</h2><p className="text-slate-600 text-sm">ไม่พบการตั้งค่าเชื่อมต่อฐานข้อมูล (URL)</p></div>;

    return (
        <div className="app-container" onClick={() => setShowParticipantDropdown(false)}>
            
            {successModal && (
                <div className="fixed inset-0 z-[700] flex items-center justify-center pointer-events-none">
                    <div className="bg-white w-[85%] max-w-[280px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-4 border-green-400">
                        <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                            <Icons.Check />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">สำเร็จ</h3>
                        <p className="text-sm text-slate-600">{successModal}</p>
                    </div>
                </div>
            )}

            {/* 📍 วงล้อโหลดข้อมูล (จะหมุนค้างไว้จนกว่าข้อมูลใหม่จะโหลดเสร็จ 100%) */}
            {loadingMsg && (
                <div className="backdrop z-[500] gap-4">
                    <Icons.Loader />
                    <div className="text-white font-bold text-sm bg-slate-900/60 px-5 py-2.5 rounded-full border border-slate-700 shadow-xl">{loadingMsg}</div>
                </div>
            )}

            <header className={`main-header ${user ? 'bg-slate-800' : 'bg-red-600'}`}>
                <div className="flex items-center gap-2"><h1 className="text-xl font-bold tracking-wide">SAIS BOOKING</h1></div>
                <div className="flex items-center gap-2 relative">
                    <button className="btn-icon" onClick={() => setShowSettings(!showSettings)}><Icons.Settings /></button>
                    
                    {showSettings && (
                        <div className="settings-menu animate-pop w-[260px] max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <h4 className="text-sm font-bold border-b border-slate-200 pb-2 mb-3 text-slate-800 flex items-center gap-2">
                                <Icons.Settings /> การตั้งค่าระบบ
                            </h4>
                            
                            <div className="settings-group mb-4 bg-blue-50 p-3 rounded-xl border border-blue-200 shadow-sm">
                                <h5 className="text-[11px] font-bold text-blue-800 mb-2 flex items-center gap-1"><Icons.Image /> Export ตารางเป็นรูปภาพ (JPG)</h5>
                                <button onClick={handleExportJPG} className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.Download /> บันทึกตารางหน้านี้
                                </button>
                                <p className="text-[8px] text-blue-500 mt-2 leading-tight">* ระบบจะบันทึกรูปภาพตารางในช่วงครึ่งเดือนที่คุณกำลังเปิดดูอยู่ ณ ปัจจุบัน</p>
                            </div>

                            <div className="settings-group mb-3 border-t border-slate-100 pt-3">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ยืด/หด ความกว้างตาราง (คอลัมน์)</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateColumnZoom(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(columnZoom * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateColumnZoom(0.1)}>+</button>
                                </div>
                            </div>
                            <div className="settings-group mb-3">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ปรับสเกลตัวอักษรปกติ (30% - 500%)</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateTableFontScale(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(tableFontScale * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateTableFontScale(0.1)}>+</button>
                                </div>
                            </div>
                            <div className="settings-group">
                                <div className="text-[10px] font-bold text-slate-500 mb-2">ขนาดฟอนต์ ลา/หยุด/กิจกรรม (30% - 500%)</div>
                                <div className="flex justify-between items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateSpecialFontScale(-0.1)}>-</button>
                                    <span className="text-sm font-black text-blue-600 w-16 text-center">{(specialFontScale * 100).toFixed(0)}%</span>
                                    <button className="bg-white border border-slate-300 p-2 rounded-lg w-12 font-black text-slate-600 active:scale-95 shadow-sm" onClick={() => updateSpecialFontScale(0.1)}>+</button>
                                </div>
                            </div>
                            <button className="mt-4 w-full py-2 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200 text-xs active:scale-95 transition-all" onClick={() => { setTableFontScale(1.0); setSpecialFontScale(1.0); setColumnZoom(1.0); }}>
                                ↺ รีเซ็ตค่าเริ่มต้น
                            </button>
                        </div>
                    )}

                    <button className="btn-icon" onClick={() => setShowManual(true)} title="คู่มือการใช้งาน"><Icons.Book /></button>
                    {user && (
                        <button className="btn-icon relative" onClick={() => { setShowActivityModal(true); if(!hasLoadedAdmin) fetchAdminData(); }}>
                            <Icons.Bell />
                            {unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                        </button>
                    )}
                    {!user ? <button className="ml-1 bg-white text-red-700 px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm" onClick={() => setShowLogin(true)}>LOGIN <Icons.User /></button>
                        : <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.User /> {user.username}</div>}
                </div>
            </header>

            <div className="bottom-nav" style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, 
                transform: isNavVisible ? 'translateY(0)' : 'translateY(100%)', 
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)', zIndex: 50
            }}>
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => handleTabChange('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => handleTabChange('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => handleTabChange('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {user && !isAdmin && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => handleTabChange('my_bookings')}><Icons.List /> งานฉัน</div>}
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { handleTabChange('admin'); setAdminTab('menu'); }}><Icons.Shield /> จัดการ</div>}
                {user && <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>}
            </div>

            {currentView === 'calendar' && (
                <div className="grid-container relative overflow-hidden pb-16">
                    <div className="nav-bar bg-white px-3 py-2 border-b flex-shrink-0 z-[45]">
                        <div className="flex justify-between items-center w-full">
                            <button onClick={() => changePeriod('prev')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1"><Icons.ChevronLeft /> ย้อนกลับ</button>
                            <div className="text-center font-bold text-slate-800 text-sm flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-4 py-1.5 rounded-xl border border-transparent hover:border-slate-200 transition-all" onClick={() => setShowMonthPicker(!showMonthPicker)}>
                                {period === 0 ? "1-15 " : `16-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()} `}
                                {currentDate.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}
                                <span className="text-slate-400 text-xs ml-1">▼</span>
                            </div>
                            <button onClick={() => changePeriod('next')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">ถัดไป <Icons.ChevronRight /></button>
                        </div>
                    </div>

                    {showMonthPicker && (
                        <div className="absolute top-[52px] left-0 right-0 bg-white border-b border-slate-200 p-4 z-[60] shadow-xl animate-pop">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <button onClick={() => setPickerYear(prev => prev - 1)} className="p-2 bg-slate-100 rounded-lg font-bold text-slate-600 active:scale-95"><Icons.ChevronLeft /></button>
                                <div className="font-bold text-lg text-red-600">ปี {pickerYear + 543}</div>
                                <button onClick={() => setPickerYear(prev => prev + 1)} className="p-2 bg-slate-100 rounded-lg font-bold text-slate-600 active:scale-95"><Icons.ChevronRight /></button>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'].map((m, i) => (
                                    <button key={i} onClick={() => { setCurrentDate(new Date(pickerYear, i, 1)); setPeriod(0); setShowMonthPicker(false); }} className={`py-3 rounded-xl text-sm font-bold border transition-all ${currentDate.getMonth() === i && currentDate.getFullYear() === pickerYear ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 active:scale-95'}`}>{m}</button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="absolute left-0 right-0 flex justify-center z-40 transition-all duration-300 pointer-events-none" style={{ top: pullY > 0 ? `${pullY}px` : '-40px', opacity: pullY > 0 ? 1 : 0 }}>
                        <div className="bg-white px-5 py-2.5 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-bold text-slate-600">
                            {isRefreshing ? <span className="text-blue-500 animate-spin text-lg leading-none">⏳</span> : <span className="text-slate-400 text-lg leading-none">⬇️</span>}
                            {isRefreshing ? 'กำลังดึงข้อมูลล่าสุด...' : 'ปล่อยเพื่ออัปเดต'}
                        </div>
                    </div>

                    <div className="grid-wrapper" ref={scrollRef} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} style={{ transform: `translateY(${pullY}px)`, transition: pullY === 0 ? 'transform 0.3s ease-out' : 'none' }}>
                        {initialLoad ? (
                            <div className="w-full h-full flex flex-col p-4 gap-2">
                                {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-16 skeleton rounded-lg bg-slate-100 animate-pulse"></div>)}
                            </div>
                        ) : (
                            <CalendarGrid 
                                daysInView={daysInView} db={db} isAdmin={isAdmin} user={user} setShowLogin={setShowLogin} 
                                setModal={setModal} setAlertMsg={setAlertMsg} handleDrop={handleDrop} handleDragOver={handleDragOver} 
                                handleDragLeave={handleDragLeave} handleDragStart={handleDragStart} setConfirmDialog={setConfirmDialog} 
                                apiAction={apiAction} setQuickAddType={setQuickAddType} filteredBookings={filteredBookings}
                                tableFontScale={tableFontScale} specialFontScale={specialFontScale} columnZoom={columnZoom} isExporting={isExporting}
                            />
                        )}
                    </div>

                    <div className="realtime-clock flex flex-col gap-1 py-2 bg-slate-50 border-t border-slate-200 shadow-inner z-50">
                        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-700">
                            <Icons.Clock />
                            <span>{currentTime.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &nbsp;{currentTime.toLocaleTimeString('th-TH')}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal bg-white px-2 py-0.5 rounded-md border border-slate-100">
                            อัปเดตข้อมูลล่าสุด: {Math.floor((new Date() - lastSyncTime) / 60000) < 1 ? 'เพิ่งอัปเดตเมื่อสักครู่' : `${Math.floor((new Date() - lastSyncTime) / 60000)} นาทีที่แล้ว`}
                        </div>
                    </div>
                </div>
            )}

            {currentView === 'documents' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.FileText /> ตรวจสอบเอกสาร</h2>
                        <div className="text-xs text-slate-500 mt-1">แตะที่กล่องเพื่อ อนุมัติ/ยกเลิก เอกสารแบบรวดเร็ว</div>
                    </div>
                    <div className="space-y-4 pb-10 pt-4">
                        {(() => {
                            const docTasks = (db.bookings || []).filter(b => String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.inspector_name) !== 'SYSTEM_EVENT' && !String(b.equipment_no).startsWith('LEAVE_') && !String(b.equipment_no).startsWith('EVENT_') && String(b.status) !== 'cancelled').sort((a, b) => new Date(b.date) - new Date(a.date));
                            if (docTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการงานตรวจ</div>;
                            return docTasks.slice(0, 30).map((h, i) => {
                                const l_ok = String(h.layout_doc) === 'true';
                                const w_ok = String(h.wiring_doc) === 'true';
                                const p_ok = String(h.precheck_doc) === 'true';
                                const all_ok = l_ok && w_ok && p_ok;
                                return (
                                    <div key={i} className={`bg-white p-4 rounded-xl shadow-sm border-2 transition-all ${all_ok ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}>
                                        <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-2">
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm">{h.equipment_no} <span className="text-xs text-slate-400 font-normal">/ {h.unit_no}</span></div>
                                                <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[200px]">{h.site_name}</div>
                                            </div>
                                            <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{h.date ? formatSafeDate(h.date) : ''}</div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div onClick={() => handleToggleDoc(h.id, 'layout_doc', h.layout_doc)} className={`doc-toggle ${l_ok ? 'approved' : 'pending'}`}>
                                                <div className="toggle-box">{l_ok && <Icons.Check />}</div>
                                                <div className="text-[10px] leading-tight">Layout</div>
                                            </div>
                                            <div onClick={() => handleToggleDoc(h.id, 'wiring_doc', h.wiring_doc)} className={`doc-toggle ${w_ok ? 'approved' : 'pending'}`}>
                                                <div className="toggle-box">{w_ok && <Icons.Check />}</div>
                                                <div className="text-[10px] leading-tight">Wiring</div>
                                            </div>
                                            <div onClick={() => handleToggleDoc(h.id, 'precheck_doc', h.precheck_doc)} className={`doc-toggle ${p_ok ? 'approved' : 'pending'}`}>
                                                <div className="toggle-box">{p_ok && <Icons.Check />}</div>
                                                <div className="text-[10px] leading-tight">Precheck</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            });
                        })()}
                    </div>
                </div>
            )}

            {currentView === 'search' && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Search /> ค้นหางาน</h2>
                            <select className="text-xs border border-slate-300 rounded-lg p-2 bg-white outline-none w-32 shadow-sm font-bold text-slate-600" value={filterArea} onChange={(e) => setFilterArea(e.target.value)}>
                                <option value="All">ทุกพื้นที่</option><option value="กรุงเทพและปริมณฑล">กทม.</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option>
                            </select>
                        </div>
                        <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-3 shadow-sm">
                            <div className="text-slate-400 mr-2"><Icons.Search /></div>
                            <input type="text" placeholder="พิมพ์ Eq No., โครงการ, หรือผู้ตรวจ..." className="w-full text-sm outline-none border-none bg-transparent font-bold text-slate-700" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-slate-400 p-1 bg-slate-100 rounded-full"><Icons.X /></button>}
                        </div>
                    </div>
                    <div className="space-y-3 pb-10">
                        {!hasLoadedAdmin ? (
                             <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4"><Icons.Loader /> กำลังโหลดฐานข้อมูลทั้งหมด...</div>
                        ) : searchQuery.trim() === '' && filterArea === 'All' ? (
                            <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">พิมพ์ข้อมูลหรือเลือกพื้นที่เพื่อเริ่มค้นหา...</div>
                        ) : (
                            (() => {
                                const searchResults = (adminDb.all_bookings || []).filter(b => {
                                    if (String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;
                                    if (String(b.status) === 'cancelled') return false;
                                    const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
                                    const s = searchQuery.toLowerCase();
                                    const matchSearch = String(b.equipment_no || '').toLowerCase().includes(s) || String(b.site_name || '').toLowerCase().includes(s) || String(b.inspector_name || '').toLowerCase().includes(s);
                                    return matchArea && matchSearch;
                                }).sort((a, b) => new Date(b.date) - new Date(a.date));
                                if (searchResults.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">ไม่พบข้อมูลที่ตรงกับการค้นหา</div>;
                                return searchResults.slice(0, 50).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:border-red-400 transition-all" onClick={() => setModal({ type: 'detail', data: h })}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100">
                                            <div><span className="text-slate-400 text-[10px] block">Eq No.</span> <span className="font-bold text-slate-700">{h.equipment_no || '-'}</span></div>
                                            <div><span className="text-slate-400 text-[10px] block">ผู้ตรวจสอบ</span> <span className="font-bold text-slate-700">{h.inspector_name || '-'}</span></div>
                                            <div><span className="text-slate-400 text-[10px] block">Unit</span> <span className="font-bold text-slate-700">{h.unit_no || '-'}</span></div>
                                            <div><span className="text-slate-400 text-[10px] block">พื้นที่</span> <span className="font-bold text-slate-700">{h.area || '-'}</span></div>
                                        </div>
                                    </div>
                                ));
                            })()
                        )}
                    </div>
                </div>
            )}

            {currentView === 'my_bookings' && !isAdmin && (
                <div className="page-view relative pb-20">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.List /> งานที่ฉันจองไว้</h2>
                    <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
                        <button onClick={() => setMyBookingsTab('pending')} className={`flex-1 py-2 text-xs font-bold rounded-md ${myBookingsTab === 'pending' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500'}`}>⏳ รอดำเนินการ</button>
                        <button onClick={() => setMyBookingsTab('approved')} className={`flex-1 py-2 text-xs font-bold rounded-md ${myBookingsTab === 'approved' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500'}`}>✅ อนุมัติแล้ว</button>
                        <button onClick={() => setMyBookingsTab('completed')} className={`flex-1 py-2 text-xs font-bold rounded-md ${myBookingsTab === 'completed' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>🗄️ ประวัติ</button>
                    </div>
                    <div className="space-y-3 pb-10">
                        {(() => {
                            const filteredTasks = (db.bookings || []).filter(b => {
                                if(String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT' || b.created_by !== user?.username) return false;
                                if(String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;

                                const isDocsOk = String(b.layout_doc) === 'true' && String(b.wiring_doc) === 'true' && String(b.precheck_doc) === 'true';
                                const isPast = new Date(formatSafeDate(b.date)) < new Date(todayLocalString); 

                                if (myBookingsTab === 'completed') return isPast;
                                if (myBookingsTab === 'approved') return isDocsOk && !isPast;
                                return !isDocsOk && !isPast; 
                            }).sort((a, b) => new Date(b.date) - new Date(a.date));
                            if (filteredTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่พบข้อมูลในหมวดหมู่นี้</div>;
                            return (
                                <>
                                    {filteredTasks.slice(0, myBookingsLimit).map((h, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                            {myBookingsTab === 'pending' && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border"><Icons.MoreVertical /></button>
                                                    {actionMenuId === h.id && (
                                                        <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-xs">
                                                            <button onClick={() => { setAreaSelection(h.area || 'กรุงเทพและปริมณฑล'); setJobTypeSelection(h.job_type || 'New'); setProductLineSelection(h.product_line || 'ES1,3300'); setModal({ type: 'booking', data: h }); setActionMenuId(null); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                            <button onClick={() => handleCancelJob(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ยกเลิกคิวงาน</button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <div className="cursor-pointer pr-10" onClick={() => setModal({ type: 'detail', data: h })}>
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div>
                                                </div>
                                                <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                                <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                                                    <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                    <div><b>ผู้ตรวจสอบ:</b> {h.inspector_name || '-'}</div><div><b>พื้นที่:</b> {h.area || '-'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {myBookingsLimit < filteredTasks.length && (
                                        <button onClick={() => setMyBookingsLimit(prev => prev + 20)} className="w-full py-3 bg-slate-200 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                            โหลดรายการเพิ่มเติม... ({myBookingsLimit} / {filteredTasks.length})
                                        </button>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
            {currentView === 'admin' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200 mb-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <Icons.Shield /> Admin Panel
                                {!hasLoadedAdmin && <span className="text-[10px] text-blue-500 animate-pulse ml-2 font-normal border border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full">ดึงข้อมูล...</span>}
                            </h2>
                            {adminTab !== 'menu' && (
                                <button onClick={() => setAdminTab('menu')} className="text-xs font-bold text-slate-500 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border shadow-sm active:scale-95">
                                    <Icons.ChevronLeft /> กลับเมนู
                                </button>
                            )}
                        </div>
                    </div>

                    {adminTab === 'menu' && (
                        <div className="grid grid-cols-2 gap-4 animate-pop pb-10">
                            <button onClick={() => setAdminTab('users')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-blue-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Icons.User /></div>
                                <span className="font-bold text-slate-700 text-sm">จัดการผู้ใช้งาน</span>
                            </button>

                            <button onClick={() => setAdminTab('inspectors')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-indigo-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center"><Icons.FileCheck /></div>
                                <span className="font-bold text-slate-700 text-sm">ผู้ตรวจ & Certificate</span>
                            </button>

                            <button onClick={() => setAdminTab('leaves')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-amber-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><Icons.Clock /></div>
                                <span className="font-bold text-amber-800 text-sm">ระบบวันลา</span>
                            </button>

                            <button onClick={() => setAdminTab('events')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-emerald-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icons.Star /></div>
                                <span className="font-bold text-emerald-800 text-sm">ระบบกิจกรรม</span>
                            </button>

                            <button onClick={() => setAdminTab('holidays')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-red-400 transition-all col-span-2">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><Icons.CalendarX /></div>
                                <span className="font-bold text-red-800 text-sm">ระบบวันหยุดบริษัท</span>
                            </button>

                            <button onClick={() => setAdminTab('all_bookings')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-slate-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"><Icons.List /></div>
                                <span className="font-bold text-slate-700 text-sm text-center">งานทั้งหมด</span>
                            </button>

                            <button onClick={() => setAdminTab('logs')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-purple-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Icons.Chart /></div>
                                <span className="font-bold text-slate-700 text-sm">ประวัติระบบ (Logs)</span>
                            </button>
                        </div>
                    )}

                    {/* 📍 TAB 1: ระบบจัดการผู้ตรวจสอบ (Inspector CRUD & Certificate) */}
                    {adminTab === 'inspectors' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <div className="bg-indigo-50 p-4 rounded-xl shadow-sm border border-indigo-200">
                                <h3 className="font-bold text-indigo-800 mb-3 border-b border-indigo-200 pb-2 flex items-center gap-2">
                                    {editInspector ? <><Icons.Edit /> แก้ไขข้อมูลผู้ตรวจ</> : <><Icons.Plus /> เพิ่มผู้ตรวจใหม่</>}
                                </h3>
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    const fd = new FormData(e.target);
                                    const name = fd.get('ins_name');
                                    const certs = Array.from(e.target.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value).join(',');
                                    
                                    const payload = {
                                        action: 'manage_inspector',
                                        sub_action: editInspector ? 'update' : 'add',
                                        old_name: editInspector?.name || '',
                                        new_name: name,
                                        product_lines: certs,
                                        user: user.username
                                    };
                                    const ok = await apiAction(payload, 'กำลังบันทึกข้อมูลผู้ตรวจ...');
                                    if(ok) { setSuccessModal('บันทึกสำเร็จ'); setEditInspector(null); e.target.reset(); }
                                }}>
                                    <label className="text-xs font-bold text-indigo-700 mb-1 block">ชื่อผู้ตรวจสอบ</label>
                                    <input type="text" name="ins_name" defaultValue={editInspector?.name || ''} required placeholder="ระบุชื่อผู้ตรวจ..." className="w-full text-sm p-3 rounded-lg border border-indigo-200 outline-none mb-4 font-bold bg-white" />
                                    
                                    <label className="text-xs font-bold text-indigo-700 mb-1 block">ใบเซอร์ / Product Line ที่อนุญาตให้ตรวจ</label>
                                    <p className="text-[10px] text-indigo-500 mb-2">* หากไม่ติ๊กเลือกเลย ระบบจะถือว่าสามารถตรวจได้ทุก Product Line โดยอัตโนมัติ</p>
                                    <div className="grid grid-cols-2 gap-2 mb-4 bg-white p-3 rounded-lg border border-indigo-100 max-h-40 overflow-y-auto custom-scrollbar">
                                        {Object.keys(PRODUCT_COLORS).filter(k => k !== 'อื่นๆโปรดระบุ').map(pl => (
                                            <label key={pl} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer p-1 hover:bg-slate-50 rounded">
                                                <input type="checkbox" name="certs" value={pl} defaultChecked={editInspector?.product_lines?.includes(pl)} className="accent-indigo-600 w-4 h-4" />
                                                {pl}
                                            </label>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {editInspector && <button type="button" onClick={() => setEditInspector(null)} className="flex-1 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg shadow-sm active:scale-95">ยกเลิก</button>}
                                        <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md active:scale-95">{editInspector ? 'บันทึกการแก้ไข' : 'ยืนยันเพิ่มผู้ตรวจ'}</button>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">รายชื่อผู้ตรวจสอบปัจจุบัน</h3>
                                <div className="space-y-2">
                                    {(db.inspectors || []).map((ins, i) => (
                                        <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <div>
                                                <div className="font-bold text-slate-800">{ins.name}</div>
                                                <div className="text-[10px] text-slate-500 mt-1 max-w-[220px] break-words leading-tight">
                                                    <span className="font-bold text-indigo-500">สิทธิ์:</span> {ins.product_lines || 'อนุญาตทั้งหมด (ไม่ได้ตั้งค่า)'}
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <button onClick={() => setEditInspector(ins)} className="p-2 bg-white text-blue-600 rounded-lg border border-blue-200 shadow-sm active:scale-95"><Icons.Edit /></button>
                                                <button onClick={() => setConfirmDialog({msg:`ยืนยันการลบผู้ตรวจ "${ins.name}" ออกจากระบบ?`, onConfirm: async() => {
                                                    setConfirmDialog(null);
                                                    const ok = await apiAction({action: 'manage_inspector', sub_action: 'delete', old_name: ins.name}, 'กำลังลบ...');
                                                    if(ok) setSuccessModal('ลบสำเร็จ');
                                                }})} className="p-2 bg-white text-red-600 rounded-lg border border-red-200 shadow-sm active:scale-95"><Icons.Trash /></button>
                                            </div>
                                        </div>
                                    ))}
                                    {(db.inspectors || []).length === 0 && <div className="text-center text-xs text-slate-400 py-4">ไม่มีข้อมูลผู้ตรวจ</div>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 📍 TAB 2: ระบบวันลา (เพิ่ม & ลบแบบกลุ่ม) */}
                    {adminTab === 'leaves' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <div className="bg-amber-50 p-4 rounded-xl shadow-sm border border-amber-200">
                                <h3 className="font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2 flex items-center gap-2"><Icons.Plus /> เพิ่มรายการวันลา</h3>
                                <form id="addLeaveForm" onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(e); }} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ตั้งแต่วันที่</label><input type="date" value={leaveStartDate} onChange={e => setLeaveStartDate(e.target.value)} required className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ถึงวันที่</label><input type="date" value={leaveEndDate} onChange={e => setLeaveEndDate(e.target.value)} required className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">เวลาเริ่ม (ไม่บังคับ)</label><input type="time" name="start_time" value={leaveStartTime} onChange={e => setLeaveStartTime(e.target.value)} className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">เวลาจบ (ไม่บังคับ)</label><input type="time" name="end_time" value={leaveEndTime} onChange={e => setLeaveEndTime(e.target.value)} className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white" /></div>
                                    </div>
                                    {leaveStartTime && leaveEndTime && leaveMins > 0 && <div className="text-[10px] text-blue-600 bg-blue-50 p-2 rounded text-center font-bold">ระยะเวลา: {formatDuration(leaveMins)}</div>}
                                    <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ผู้ลา</label><select value={leaveInspector} onChange={e => setLeaveInspector(e.target.value)} required className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white"><option value="">-- เลือกผู้ลา --</option>{(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}</select></div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-700 mb-1 block">ประเภทการลา</label>
                                        <select name="leave_type" value={leaveType} onChange={e => setLeaveType(e.target.value)} className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white mb-2">
                                            <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option><option value="อื่นๆโปรดระบุ">อื่นๆ โปรดระบุ</option>
                                        </select>
                                        {leaveType === 'อื่นๆโปรดระบุ' && <input type="text" name="custom_leave" placeholder="ระบุประเภทการลา" value={customLeaveType} onChange={e => setCustomLeaveType(e.target.value)} required className="w-full text-sm p-2 rounded border border-amber-200 outline-none font-bold bg-white" />}
                                    </div>
                                    {leaveDates.length > 0 && <div className="bg-white p-2 rounded border border-amber-100 text-[10px] font-bold text-slate-600">สรุปวันลา ({leaveDates.length} วัน): {leaveDates.join(', ')}</div>}
                                    <button type="button" onClick={() => { setQuickAddType('leave'); setTimeout(() => { document.getElementById('addLeaveForm').requestSubmit(); }, 100); }} disabled={leaveDates.length === 0 || !leaveInspector} className="w-full py-3 bg-amber-500 text-white font-bold rounded-lg shadow-md active:scale-95 disabled:opacity-50 mt-2">บันทึกวันลา</button>
                                </form>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">รายการวันลา (ล่วงหน้า)</h3>
                                    {selectedLeavesToDelete.length > 0 && (
                                        <button onClick={() => handleBulkDelete('leave', selectedLeavesToDelete)} className="text-[10px] bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm active:scale-95">ลบที่เลือก ({selectedLeavesToDelete.length})</button>
                                    )}
                                </div>
                                <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                                    {(() => {
                                        const leaves = (db.bookings || []).filter(b => b.job_type === 'leave' || String(b.equipment_no).startsWith('LEAVE_')).sort((a,b) => new Date(a.date) - new Date(b.date)).filter(b => b.date && b.date >= todayLocalString);
                                        if (leaves.length === 0) return <div className="text-center text-slate-400 p-4 text-xs">ไม่มีรายการวันลาล่วงหน้า</div>;
                                        return leaves.map((l, i) => (
                                            <label key={i} className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600 rounded" checked={selectedLeavesToDelete.includes(l.id)} onChange={(e) => {
                                                    if (e.target.checked) setSelectedLeavesToDelete(prev => [...prev, l.id]);
                                                    else setSelectedLeavesToDelete(prev => prev.filter(id => id !== l.id));
                                                }} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{l.inspector_name} <span className="text-slate-500 font-normal text-xs">({l.site_name})</span></div>
                                                    <div className="text-[10px] text-slate-500">{l.date ? formatSafeDate(l.date) : ''}</div>
                                                </div>
                                            </label>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 📍 TAB 3: ระบบกิจกรรม (เพิ่ม & ลบแบบกลุ่ม) */}
                    {adminTab === 'events' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <div className="bg-emerald-50 p-4 rounded-xl shadow-sm border border-emerald-200">
                                <h3 className="font-bold text-emerald-800 mb-3 border-b border-emerald-200 pb-2 flex items-center gap-2"><Icons.Plus /> เพิ่มรายการกิจกรรม</h3>
                                <form id="addEventForm" onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(e); }} className="space-y-3">
                                    <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">หัวข้อกิจกรรม</label><input type="text" name="site_name" required className="w-full text-sm p-2 rounded border border-emerald-200 outline-none font-bold bg-white" /></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ตั้งแต่วันที่</label><input type="date" value={eventStartDate} onChange={e => setEventStartDate(e.target.value)} required className="w-full text-sm p-2 rounded border border-emerald-200 outline-none font-bold bg-white" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ถึงวันที่</label><input type="date" value={eventEndDate} onChange={e => setEventEndDate(e.target.value)} required className="w-full text-sm p-2 rounded border border-emerald-200 outline-none font-bold bg-white" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">เวลาเริ่ม (ไม่บังคับ)</label><input type="time" name="start_time" value={eventStartTime} onChange={e => setEventStartTime(e.target.value)} className="w-full text-sm p-2 rounded border border-emerald-200 outline-none font-bold bg-white" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">เวลาจบ (ไม่บังคับ)</label><input type="time" name="end_time" value={eventEndTime} onChange={e => setEventEndTime(e.target.value)} className="w-full text-sm p-2 rounded border border-emerald-200 outline-none font-bold bg-white" /></div>
                                    </div>
                                    {eventStartTime && eventEndTime && eventMins > 0 && <div className="text-[10px] text-blue-600 bg-blue-50 p-2 rounded text-center font-bold">ระยะเวลา: {formatDuration(eventMins)}</div>}
                                    
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-slate-700 mb-1 block">ผู้เข้าร่วม</label>
                                        <div className="w-full text-sm p-2 rounded border border-emerald-200 font-bold bg-white flex justify-between items-center cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowParticipantDropdown(!showParticipantDropdown); }}>
                                            <span className="truncate pr-4 text-slate-700">
                                                {eventInspector === 'ALL' ? '✅ ทุกคน (กิจกรรมรวม)' : (eventParticipants.length > 0 ? `ผู้เข้าร่วม (${eventParticipants.length} คน)` : '-- เลือกผู้เข้าร่วม --')}
                                            </span>
                                            <span className="text-slate-400 pointer-events-none transition-transform duration-200" style={{ transform: showParticipantDropdown ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
                                        </div>
                                        
                                        {showParticipantDropdown && (
                                            <div className="absolute z-[100] w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-xl max-h-60 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                                                <div className="p-2 border-b border-slate-100 bg-slate-50 sticky top-0">
                                                    <label className="flex items-center gap-2 text-sm font-bold text-slate-800 cursor-pointer p-2 hover:bg-slate-200 rounded">
                                                        <input type="checkbox" checked={eventInspector === 'ALL'} onChange={() => { if (eventInspector !== 'ALL') { setEventInspector('ALL'); setEventParticipants([]); setShowParticipantDropdown(false); } }} className="w-4 h-4 accent-blue-600" />
                                                        ✅ ทุกคน (กิจกรรมรวมทั้งบริษัท)
                                                    </label>
                                                </div>
                                                <div className="p-2">
                                                    <div className="text-xs font-bold text-slate-500 mb-2 px-2">หรือเลือกเฉพาะบุคคล:</div>
                                                    {(db.inspectors || []).map(i => (
                                                        <label key={i.name} className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer p-2 hover:bg-slate-100 rounded">
                                                            <input type="checkbox" checked={eventInspector !== 'ALL' && eventParticipants.includes(i.name)} onChange={(e) => {
                                                                setEventInspector('SOME');
                                                                if (e.target.checked) setEventParticipants(prev => [...prev, i.name]);
                                                                else setEventParticipants(prev => prev.filter(p => p !== i.name));
                                                            }} className="w-4 h-4 accent-blue-600" />
                                                            {i.name}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {eventDates.length > 0 && <div className="bg-white p-2 rounded border border-emerald-100 text-[10px] font-bold text-slate-600">สรุปวันกิจกรรม ({eventDates.length} วัน): {eventDates.join(', ')}</div>}
                                    <button type="button" onClick={() => { 
                                        if (eventInspector === 'SOME' && eventParticipants.length === 0) return setAlertMsg('กรุณาเลือกผู้เข้าร่วมอย่างน้อย 1 คน');
                                        setQuickAddType('event'); 
                                        
                                        if (eventInspector === 'ALL') {
                                            setTimeout(() => { document.getElementById('addEventForm').requestSubmit(); }, 100);
                                        } else {
                                            const siteName = document.querySelector('#addEventForm input[name="site_name"]').value;
                                            const sTime = document.querySelector('#addEventForm input[name="start_time"]').value;
                                            const eTime = document.querySelector('#addEventForm input[name="end_time"]').value;
                                            if (!siteName) return setAlertMsg('กรุณาระบุหัวข้อกิจกรรม');
                                            
                                            let finalSiteName = siteName;
                                            if (sTime && eTime) finalSiteName = `${sTime}-${eTime} ${siteName}`;

                                            setConfirmDialog({
                                                msg: `ยืนยันบันทึกกิจกรรมให้ ${eventParticipants.length} คน?`,
                                                onConfirm: async () => {
                                                    setConfirmDialog(null); setLoadingMsg('กำลังบันทึกกิจกรรมแบบกลุ่ม...');
                                                    let payload = [];
                                                    const timeStamp = Date.now();
                                                    eventDates.forEach(d => {
                                                        eventParticipants.forEach(p => {
                                                            payload.push({ id: '', date: d, inspector_name: p, job_type: 'company_event', site_name: finalSiteName, equipment_no: `EVENT_${timeStamp}`, user: user.username, reason: `[เพิ่มกิจกรรมกลุ่ม]\nโดย: ${user.username}\nผู้เข้าร่วม: ${p}` });
                                                        });
                                                    });

                                                    if (payload.length === 0) return;
                                                    try {
                                                        let successCount = 0;
                                                        for (let p of payload) {
                                                            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'create_booking', ...p }) });
                                                            const result = await res.json();
                                                            if (result.status === 'ok') successCount++;
                                                        }
                                                        await fetchCoreData(true, null); setLoadingMsg(null);
                                                        if (successCount > 0) { setSuccessModal(`บันทึกสำเร็จ ${successCount} รายการ`); document.getElementById('addEventForm').reset(); setEventStartDate(''); setEventEndDate(''); setEventParticipants([]); }
                                                    } catch(e) { setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาดในการบันทึก'); }
                                                }
                                            });
                                        }
                                    }} disabled={eventDates.length === 0 || (eventInspector !== 'ALL' && eventParticipants.length === 0)} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg shadow-md active:scale-95 disabled:opacity-50 mt-2">บันทึกกิจกรรม</button>
                                </form>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">รายการกิจกรรม (ล่วงหน้า)</h3>
                                    {selectedEventsToDelete.length > 0 && (
                                        <button onClick={() => handleBulkDelete('event', selectedEventsToDelete)} className="text-[10px] bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm active:scale-95">ลบที่เลือก ({selectedEventsToDelete.length})</button>
                                    )}
                                </div>
                                <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                                    {(() => {
                                        const events = (db.bookings || []).filter(b => b.job_type === 'company_event' || String(b.equipment_no).startsWith('EVENT_')).sort((a,b) => new Date(a.date) - new Date(b.date)).filter(b => b.date && b.date >= todayLocalString);
                                        if (events.length === 0) return <div className="text-center text-slate-400 p-4 text-xs">ไม่มีรายการกิจกรรมล่วงหน้า</div>;
                                        return events.map((l, i) => (
                                            <label key={i} className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600 rounded" checked={selectedEventsToDelete.includes(l.id)} onChange={(e) => {
                                                    if (e.target.checked) setSelectedEventsToDelete(prev => [...prev, l.id]);
                                                    else setSelectedEventsToDelete(prev => prev.filter(id => id !== l.id));
                                                }} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{l.site_name}</div>
                                                    <div className="text-[10px] text-slate-500">{l.date ? formatSafeDate(l.date) : ''} | {l.inspector_name}</div>
                                                </div>
                                            </label>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 📍 TAB 4: ระบบวันหยุด (เพิ่ม & ลบแบบกลุ่ม) */}
                    {adminTab === 'holidays' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <div className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-200">
                                <h3 className="font-bold text-red-800 mb-3 border-b border-red-200 pb-2 flex items-center gap-2"><Icons.Plus /> เพิ่มรายการวันหยุดบริษัท</h3>
                                <form id="addHolidayForm" onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(e); }} className="space-y-3">
                                    <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ชื่อวันหยุด</label><input type="text" name="site_name" required className="w-full text-sm p-2 rounded border border-red-200 outline-none font-bold bg-white" /></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ตั้งแต่วันที่</label><input type="date" value={holidayStartDate} onChange={e => setHolidayStartDate(e.target.value)} required className="w-full text-sm p-2 rounded border border-red-200 outline-none font-bold bg-white" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-700 mb-1 block">ถึงวันที่</label><input type="date" value={holidayEndDate} onChange={e => setHolidayEndDate(e.target.value)} required className="w-full text-sm p-2 rounded border border-red-200 outline-none font-bold bg-white" /></div>
                                    </div>
                                    {holidayDates.length > 0 && <div className="bg-white p-2 rounded border border-red-100 text-[10px] font-bold text-slate-600">สรุปวันหยุด ({holidayDates.length} วัน): {holidayDates.join(', ')}</div>}
                                    <button type="button" onClick={() => { setQuickAddType('holiday'); setTimeout(() => { document.getElementById('addHolidayForm').requestSubmit(); }, 100); }} disabled={holidayDates.length === 0} className="w-full py-3 bg-red-600 text-white font-bold rounded-lg shadow-md active:scale-95 disabled:opacity-50 mt-2">บันทึกวันหยุด</button>
                                </form>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">รายการวันหยุด (ล่วงหน้า)</h3>
                                    {selectedHolidaysToDelete.length > 0 && (
                                        <button onClick={() => handleBulkDelete('holiday', selectedHolidaysToDelete)} className="text-[10px] bg-red-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-sm active:scale-95">ลบที่เลือก ({selectedHolidaysToDelete.length})</button>
                                    )}
                                </div>
                                <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                                    {(() => {
                                        const holidays = (db.bookings || []).filter(b => b.job_type === 'public_holiday' || String(b.equipment_no).startsWith('HLD_')).sort((a,b) => new Date(a.date) - new Date(b.date)).filter(b => b.date && b.date >= todayLocalString);
                                        if (holidays.length === 0) return <div className="text-center text-slate-400 p-4 text-xs">ไม่มีรายการวันหยุดล่วงหน้า</div>;
                                        return holidays.map((l, i) => (
                                            <label key={i} className="flex items-center gap-3 p-2 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600 rounded" checked={selectedHolidaysToDelete.includes(l.id)} onChange={(e) => {
                                                    if (e.target.checked) setSelectedHolidaysToDelete(prev => [...prev, l.id]);
                                                    else setSelectedHolidaysToDelete(prev => prev.filter(id => id !== l.id));
                                                }} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-bold text-slate-800 text-sm truncate">{l.site_name}</div>
                                                    <div className="text-[10px] text-slate-500">{l.date ? formatSafeDate(l.date) : ''}</div>
                                                </div>
                                            </label>
                                        ));
                                    })()}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 📍 TAB 5: รายการงานทั้งหมด */}
                    {adminTab === 'all_bookings' && (
                        <div className="space-y-3 mt-4 animate-pop">
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : (adminDb.all_bookings || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูล</div> :
                            <>
                                {(adminDb.all_bookings || []).slice(0, adminBookingsLimit).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border"><Icons.MoreVertical /></button>
                                            {actionMenuId === h.id && (
                                                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-xs">
                                                    <button onClick={() => { setAreaSelection(h.area || 'กรุงเทพและปริมณฑล'); setJobTypeSelection(h.job_type || 'New'); setProductLineSelection(h.product_line || 'ES1,3300'); setModal({ type: 'booking', data: h }); setActionMenuId(null); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                    <button onClick={() => handleCancelBooking(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ลบข้อมูล</button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="cursor-pointer pr-10" onClick={() => setModal({ type: 'detail', data: h })}>
                                            <div className="font-bold text-slate-800 text-sm mb-1 pr-6">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                                                <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                <div><b>ผู้ตรวจสอบ:</b> {h.inspector_name || '-'}</div><div><b>ประเภท:</b> {h.job_type || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {adminBookingsLimit < (adminDb.all_bookings || []).length && (
                                    <button onClick={() => setAdminBookingsLimit(prev => prev + 20)} className="w-full py-3 bg-slate-200 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                        โหลดเพิ่มเติม ({adminBookingsLimit} / {(adminDb.all_bookings || []).length})
                                    </button>
                                )}
                            </>
                            }
                        </div>
                    )}

                    {/* 📍 TAB 6: จัดการผู้ใช้งาน */}
                    {adminTab === 'users' && (
                        <div className="space-y-3 mt-4 animate-pop">
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                                <h3 className="font-bold text-blue-800 text-sm mb-1">จัดการผู้ใช้งาน</h3>
                                <p className="text-xs text-blue-600">ตรวจสอบสถานะและสิทธิ์การใช้งานของสมาชิกในระบบ</p>
                            </div>
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : (adminDb.users || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูลผู้ใช้</div> :
                            (adminDb.users || []).map((u, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-slate-800 flex items-center gap-2">
                                            {u.username}
                                            {u.role === 'admin' && <span className="bg-red-100 text-red-600 text-[9px] px-2 py-0.5 rounded-full">Admin</span>}
                                        </div>
                                        <div className="text-[10px] text-slate-500 mt-1">อัปเดตล่าสุด: {u.updated_at ? formatSafeDate(u.updated_at) : '-'}</div>
                                    </div>
                                    <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">อนุมัติแล้ว</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 📍 TAB 7: ประวัติระบบ (Logs) */}
                    {adminTab === 'logs' && (
                        <div className="space-y-3 mt-4 animate-pop pb-10">
                            <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-2.5 shadow-sm mb-4">
                                <div className="text-slate-400 mr-2"><Icons.Search /></div>
                                <input type="text" placeholder="ค้นหาประวัติ..." className="w-full text-sm outline-none border-none bg-transparent font-bold text-slate-700" value={logSearchQuery} onChange={(e) => setLogSearchQuery(e.target.value)} />
                                {logSearchQuery && <button onClick={() => setLogSearchQuery('')} className="text-slate-400 p-1"><Icons.X /></button>}
                            </div>
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : 
                            (() => {
                                const filteredLogs = (adminDb.logs || []).filter(l => String(l.action || '').toLowerCase().includes(logSearchQuery.toLowerCase()) || String(l.user || '').toLowerCase().includes(logSearchQuery.toLowerCase()) || String(l.details || '').toLowerCase().includes(logSearchQuery.toLowerCase()));
                                if (filteredLogs.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีประวัติ</div>;
                                return (
                                    <>
                                        {filteredLogs.slice(0, logsLimit).map((l, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="font-bold text-slate-800 text-sm">{l.action || 'ไม่ระบุ'}</div>
                                                    <div className="text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded">{l.timestamp || '-'}</div>
                                                </div>
                                                <div className="text-xs text-slate-600 mb-2"><b>ผู้ใช้งาน:</b> {l.user || '-'}</div>
                                                <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 whitespace-pre-wrap font-mono leading-relaxed">{l.details || '-'}</div>
                                            </div>
                                        ))}
                                        {logsLimit < filteredLogs.length && (
                                            <button onClick={() => setLogsLimit(prev => prev + 20)} className="w-full py-3 bg-slate-200 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                                โหลดเพิ่มเติม ({logsLimit} / {filteredLogs.length})
                                            </button>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    )}
                </div>
            )}

            {/* ========================================= MODALS ========================================= */}

            {modal?.type === 'task_action' && (
                <div className="backdrop" onClick={() => setModal(null)}>
                    <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3"></div>
                        <div className="px-6 pb-8">
                            <h3 className="text-lg font-black text-slate-800 mb-1 truncate">{modal.data.equipment_no || modal.data.site_name}</h3>
                            <p className="text-sm text-slate-500 mb-6 font-bold">{modal.data.date ? formatSafeDate(modal.data.date) : ''} | {modal.data.inspector_name}</p>
                            
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl active:scale-95 transition-all font-bold text-slate-700" onClick={() => { setModal({ type: 'detail', data: modal.data }); }}>
                                    <div className="flex items-center gap-3"><Icons.FileText /> ดูรายละเอียดงาน</div><Icons.ChevronRight />
                                </button>
                                
                                {isAdmin && (String(modal.data.equipment_no).startsWith('EVENT_') || String(modal.data.equipment_no).startsWith('HLD_') || String(modal.data.equipment_no).startsWith('LEAVE_')) ? (
                                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl active:scale-95 transition-all font-bold" onClick={() => { setModal({ type: 'edit_special', data: modal.data }); }}>
                                        <div className="flex items-center gap-3"><Icons.Edit /> แก้ไข วันที่/ชื่อ/ผู้รับผิดชอบ</div><Icons.ChevronRight />
                                    </button>
                                ) : (
                                    <button className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl active:scale-95 transition-all font-bold" onClick={() => { 
                                        setAreaSelection(modal.data.area || 'กรุงเทพและปริมณฑล'); setJobTypeSelection(modal.data.job_type || 'New'); setProductLineSelection(modal.data.product_line || 'ES1,3300');
                                        setModal({ type: 'booking', data: modal.data }); 
                                    }}>
                                        <div className="flex items-center gap-3"><Icons.Edit /> แก้ไขข้อมูล</div><Icons.ChevronRight />
                                    </button>
                                )}
                                
                                <button className="w-full flex items-center justify-between p-4 bg-red-50 text-red-600 rounded-xl active:scale-95 transition-all font-bold" onClick={() => handleCancelBooking(modal.data)}>
                                    <div className="flex items-center gap-3"><Icons.Trash /> ลบข้อมูลทิ้ง</div><Icons.ChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modal?.type === 'edit_special' && (
                <div className="backdrop">
                    <div className="modal-card bg-white w-[90%] max-w-md rounded-2xl flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Icons.Edit /> แก้ไขข้อมูล</h3>
                            <button className="btn-close-modern" onClick={() => setModal(null)}><Icons.X /></button>
                        </div>
                        <div className="p-5 overflow-y-auto">
                            <form onSubmit={handleEditSpecialSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">หัวข้อ / ชื่อโครงการ</label>
                                    <input type="text" name="site_name" defaultValue={modal.data?.site_name} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">วันที่</label>
                                    <input type="date" name="date" defaultValue={modal.data?.date ? formatSafeDate(modal.data.date) : ''} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ผู้รับผิดชอบ</label>
                                    <select name="inspector_name" defaultValue={modal.data?.inspector_name} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold">
                                        <option value="SYSTEM_EVENT">✅ ทุกคน (กิจกรรมรวม)</option>
                                        {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>👤 เฉพาะ: {i.name}</option>)}
                                    </select>
                                </div>
                                <div className="pt-4 flex gap-2">
                                    <button type="button" onClick={() => setModal(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl active:scale-95">ยกเลิก</button>
                                    <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95">บันทึกการแก้ไข</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {modal?.type === 'admin_cell_action' && (
                <div className="backdrop" onClick={() => setModal(null)}>
                    <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3"></div>
                        <div className="px-6 pb-8">
                            <h3 className="text-lg font-black text-slate-800 mb-1">จองคิว / เพิ่มรายการ</h3>
                            <p className="text-sm text-slate-500 mb-6 font-bold">{modal.data.date} | {modal.data.inspector_name}</p>
                            
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-4 bg-blue-50 text-blue-700 rounded-xl active:scale-95 transition-all font-bold" onClick={() => { setModal({ type: 'booking', data: { isAdminOverride: true, date: modal.data.date, inspector_name: modal.data.inspector_name } }); }}>
                                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Icons.Plus /></div> จองคิวงานปกติ</div><Icons.ChevronRight />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 bg-emerald-50 text-emerald-700 rounded-xl active:scale-95 transition-all font-bold" onClick={() => { setEventStartDate(modal.data.date); setEventEndDate(modal.data.date); setEventInspector(modal.data.inspector_name); setModal(null); handleTabChange('admin'); setAdminTab('events'); }}>
                                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"><Icons.CalendarX /></div> เพิ่มกิจกรรมพิเศษ</div><Icons.ChevronRight />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 bg-amber-50 text-amber-700 rounded-xl active:scale-95 transition-all font-bold" onClick={() => { setLeaveStartDate(modal.data.date); setLeaveEndDate(modal.data.date); setLeaveInspector(modal.data.inspector_name); setModal(null); handleTabChange('admin'); setAdminTab('leaves'); }}>
                                    <div className="flex items-center gap-3"><div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600"><Icons.User /></div> ลงวันลาหยุด</div><Icons.ChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modal?.type === 'detail' && (
                <div className="backdrop">
                    <div className="modal-card bg-white w-[95%] max-w-lg rounded-2xl flex flex-col h-[85vh]">
                        <div className="relative h-[25vh] min-h-[180px] bg-slate-800 rounded-t-2xl flex-shrink-0 flex flex-col justify-end p-5">
                            <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center hover:bg-white/40 transition-all" onClick={() => setModal(null)}><Icons.X /></button>
                            <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-red-500">{modal.data?.job_type || '-'}</div>
                            <h2 className="text-xl font-black text-white leading-tight mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{modal.data?.site_name || '-'}</h2>
                            <p className="text-slate-300 text-xs font-bold">{modal.data?.date ? formatSafeDate(modal.data.date) : ''}</p>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 bg-slate-50 custom-scrollbar relative">
                            <div className="absolute -top-6 right-5 bg-white px-5 py-3 rounded-2xl shadow-lg border border-slate-100 text-center">
                                <div className="text-[10px] text-slate-400 font-bold mb-1">ผู้ตรวจสอบ</div>
                                <div className="text-sm font-black text-blue-600">{modal.data?.inspector_name || '-'}</div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-6">
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1"><Icons.FileText /> Eq No.</div><div className="font-bold text-slate-800">{modal.data?.equipment_no || '-'}</div></div>
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1"><Icons.FileText /> Unit No.</div><div className="font-bold text-slate-800">{modal.data?.unit_no || '-'}</div></div>
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1"><Icons.Star /> Product Line</div><div className="font-bold text-slate-800">{modal.data?.product_line || '-'}</div></div>
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100"><div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1"><Icons.List /> พื้นที่</div><div className="font-bold text-slate-800">{modal.data?.area || '-'}</div></div>
                            </div>
                            
                            <div className="mt-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                                <div className="flex flex-col"><div className="text-[10px] text-slate-400 mb-1">เบอร์โทรติดต่อ</div><div className="font-bold text-slate-800">{modal.data?.tel || '-'}</div></div>
                                {modal.data?.tel && <a href={`tel:${modal.data.tel}`} className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-xs font-bold active:scale-95">โทรด่วน</a>}
                            </div>
                            
                            {modal.data?.map_link && (
                                <div className="mt-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                    <div className="text-[10px] text-slate-400 mb-2">แผนที่ / พิกัด</div>
                                    <a href={modal.data.map_link} target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-blue-50 text-blue-600 text-center rounded-lg text-xs font-bold border border-blue-100 active:scale-95">📍 เปิด Google Maps</a>
                                </div>
                            )}

                            <div className="mt-5 mb-2"><h4 className="font-bold text-slate-700 text-sm flex items-center gap-2"><Icons.Check /> สถานะเอกสารหน้างาน</h4></div>
                            <div className="grid grid-cols-3 gap-2">
                                {['layout', 'wiring', 'precheck'].map((doc) => {
                                    const isOk = String(modal.data[`${doc}_doc`]) === 'true';
                                    const imgUrl = modal.data[`${doc}_img`];
                                    return (
                                        <div key={doc} className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 ${isOk ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${isOk ? 'bg-green-500' : 'bg-slate-300'}`}>{isOk && <Icons.Check />}</div>
                                            <div className="text-[10px] font-bold text-slate-600 uppercase">{doc}</div>
                                            {imgUrl && <a href={imgUrl} target="_blank" rel="noopener noreferrer" className="mt-1 text-[9px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded cursor-pointer">ดูรูป</a>}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-6 text-center border-t border-slate-200 pt-4">
                                <p className="text-[10px] text-slate-400">สร้างโดย: {modal.data?.created_by || 'ไม่ทราบ'}</p>
                                <p className="text-[10px] text-slate-400">บันทึกเมื่อ: {modal.data?.created_at ? new Date(modal.data.created_at).toLocaleString('th-TH') : '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modal?.type === 'booking' && (
                <div className="backdrop">
                    <div className="modal-card bg-white w-[95%] max-w-lg rounded-2xl flex flex-col h-[90vh]">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-blue-50 rounded-t-2xl flex-shrink-0">
                            <h3 className="font-bold text-blue-800 flex items-center gap-2">{modal.data?.id ? <><Icons.Edit /> แก้ไขข้อมูลจองคิว</> : <><Icons.Plus /> จองคิวงานตรวจ</>}</h3>
                            <button className="btn-close-modern" onClick={() => { setModal(null); setLiveMapUrl(''); }}><Icons.X /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-slate-50">
                            <form onSubmit={handleBookingSubmit} className="space-y-4">
                                {isAdmin && modal.data?.isAdminOverride ? (
                                    <div className="grid grid-cols-2 gap-3 bg-blue-100 p-3 rounded-xl border border-blue-200 mb-2">
                                        <div><label className="text-[10px] font-bold text-blue-800 mb-1 block">วันที่ต้องการจอง</label><input type="date" name="admin_date_target" defaultValue={modal.data.date} required className="w-full text-sm p-2 rounded border border-blue-300 outline-none font-bold bg-white" /></div>
                                        <div><label className="text-[10px] font-bold text-blue-800 mb-1 block">ระบุผู้ตรวจสอบ</label><select name="admin_inspector_target" defaultValue={modal.data.inspector_name} required className="w-full text-sm p-2 rounded border border-blue-300 outline-none font-bold bg-white"><option value="">-- เลือก --</option>{(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}</select></div>
                                    </div>
                                ) : (
                                    <div className="bg-blue-600 text-white p-4 rounded-xl shadow-inner text-center mb-2">
                                        <div className="text-xs opacity-80 mb-1">จองคิวงานสำหรับ</div>
                                        <div className="text-lg font-black">{modal.data?.date ? formatSafeDate(modal.data.date) : ''}</div>
                                        <div className="text-sm font-bold opacity-90 mt-1">ผู้ตรวจสอบ: {modal.data?.inspector_name || '-'}</div>
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">Equipment No.</label><input type="text" name="equipment_no" defaultValue={modal.data?.equipment_no} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none focus:border-blue-500 transition-all font-bold bg-white" placeholder="เช่น 55000000" /></div>
                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">Unit No.</label><input type="text" name="unit_no" defaultValue={modal.data?.unit_no} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none focus:border-blue-500 transition-all font-bold bg-white" placeholder="เช่น L1" /></div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Product Line</label>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        {Object.entries(PRODUCT_COLORS).filter(([k]) => k !== 'อื่นๆโปรดระบุ').map(([k, color]) => (
                                            <div key={k} onClick={() => setProductLineSelection(k)} className={`cursor-pointer border p-2 rounded-lg text-xs font-bold text-center transition-all ${productLineSelection === k ? `${color} text-white border-transparent shadow-md scale-105` : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                                {k}
                                            </div>
                                        ))}
                                        <div onClick={() => setProductLineSelection('อื่นๆโปรดระบุ')} className={`cursor-pointer border p-2 rounded-lg text-xs font-bold text-center transition-all ${productLineSelection === 'อื่นๆโปรดระบุ' ? `bg-slate-700 text-white border-transparent shadow-md scale-105` : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                            อื่นๆ โปรดระบุ
                                        </div>
                                    </div>
                                    {productLineSelection === 'อื่นๆโปรดระบุ' && <input type="text" name="custom_product_line" defaultValue={modal.data?.product_line && !PRODUCT_COLORS[modal.data?.product_line] ? modal.data.product_line : ''} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white animate-pop" placeholder="ระบุ Product Line" />}
                                </div>

                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อโครงการ (Site Name)</label><input type="text" name="site_name" defaultValue={modal.data?.site_name} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none focus:border-blue-500 transition-all font-bold bg-white" placeholder="พิมพ์ชื่อโครงการ" /></div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">เวลาเริ่มงาน (ตัวเลือก)</label><input type="time" name="job_start_time" className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white" /></div>
                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">เวลาจบงาน (ตัวเลือก)</label><input type="time" name="job_end_time" className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white" /></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">ประเภทงาน</label>
                                        <select name="job_type" value={jobTypeSelection} onChange={e => setJobTypeSelection(e.target.value)} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white">
                                            {['New', 'MOD', 'Temporary', 'Re-Ins', 'Builder lift', 'Demolition', 'SAIS Handover', 'FVI', 'Follow up'].map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">พื้นที่</label>
                                        <select name="area" value={areaSelection} onChange={e => setAreaSelection(e.target.value)} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white">
                                            <option value="กรุงเทพและปริมณฑล">กรุงเทพฯและปริมณฑล</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option><option value="พัทยา">พัทยา</option><option value="ขอนแก่น">ขอนแก่น</option><option value="other">อื่นๆ โปรดระบุ</option>
                                        </select>
                                    </div>
                                </div>
                                {areaSelection === 'other' && <input type="text" name="custom_area" defaultValue={modal.data?.area && !['กรุงเทพและปริมณฑล','เชียงใหม่','ภูเก็ต','พัทยา','ขอนแก่น'].includes(modal.data.area) ? modal.data.area : ''} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white animate-pop" placeholder="ระบุพื้นที่" />}
                                
                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">เบอร์โทรติดต่อ (10 หลัก)</label><input type="tel" name="tel" defaultValue={modal.data?.tel} required={!isAdmin} maxLength="10" className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white" placeholder="08XXXXXXXX" /></div>
                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">ลิงก์แผนที่ (Google Maps)</label><input type="url" name="map_link" defaultValue={modal.data?.map_link} onChange={e => handleMapChange(e.target.value)} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold bg-white" placeholder="https://maps.google.com/..." /></div>
                                
                                {liveMapUrl && <iframe src={liveMapUrl} className="map-preview" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>}

                                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 mt-4">
                                    <div className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-2"><Icons.Upload /> แนบไฟล์รูปภาพเอกสาร (ไม่บังคับ)</div>
                                    <div className="space-y-3">
                                        {['layout', 'wiring', 'precheck'].map(doc => (
                                            <div key={doc} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                <div className="w-20 text-[10px] font-bold text-slate-600 uppercase text-center">{doc}</div>
                                                <input type="hidden" id={`${doc}_img_input`} name={`${doc}_img`} defaultValue={modal.data?.[`${doc}_img`] || ''} />
                                                <input type="file" accept="image/*" id={`file_${doc}`} className="hidden" onChange={e => handleImageUpload(e, doc)} />
                                                <button type="button" onClick={() => document.getElementById(`file_${doc}`).click()} disabled={uploadingDoc[doc]} className="flex-1 text-xs py-2 bg-slate-50 border border-slate-200 rounded-md font-bold text-slate-600 active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50">
                                                    {uploadingDoc[doc] ? <span className="animate-spin text-lg leading-none">⏳</span> : <Icons.Upload />} {uploadingDoc[doc] ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพ'}
                                                </button>
                                                {modal.data?.[`${doc}_img`] && !uploadingDoc[doc] && <div className="text-green-500"><Icons.Check /></div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {isAdmin && (
                                    <div className="bg-slate-200 p-4 rounded-xl border border-slate-300 mt-4 space-y-3">
                                        <div className="text-xs font-bold text-slate-700 flex items-center gap-2"><Icons.Shield /> ส่วนจัดการเอกสาร (เฉพาะ Admin)</div>
                                        {['layout', 'wiring', 'precheck'].map(doc => (
                                            <label key={doc} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-200 cursor-pointer">
                                                <input type="checkbox" name={`${doc}_doc`} defaultChecked={String(modal.data?.[`${doc}_doc`]) === 'true'} className="w-5 h-5 accent-green-600" />
                                                <span className="text-xs font-bold text-slate-700">ยืนยันได้รับเอกสาร {doc.toUpperCase()} แล้ว</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {isAdmin && !modal.data?.id && (
                                    <label className="flex items-center gap-2 mt-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <input type="checkbox" name="keep_open" className="w-4 h-4 accent-blue-600" />
                                        <span className="text-xs font-bold text-blue-800">จองเสร็จแล้ว ไม่ต้องปิดหน้าต่างนี้ (สำหรับจองต่อเนื่อง)</span>
                                    </label>
                                )}

                                <div className="pt-2 sticky bottom-0 bg-slate-50 pb-2 z-10 border-t border-slate-200 mt-4">
                                    <button type="submit" className="w-full py-4 bg-blue-600 text-white font-black rounded-xl shadow-lg shadow-blue-200 active:scale-95 transition-all flex justify-center items-center gap-2">
                                        {modal.data?.id ? 'บันทึกการแก้ไข' : 'ยืนยันการจองคิวงาน'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showActivityModal && (
                <div className="backdrop">
                    <div className="modal-card bg-white w-[90%] max-w-md rounded-2xl flex flex-col h-[85vh]">
                        <div className="flex bg-slate-100 p-1.5 rounded-t-2xl flex-shrink-0">
                            <button onClick={() => setActivityTab('notif')} className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${activityTab === 'notif' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>การแจ้งเตือน</button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 custom-scrollbar relative">
                            <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow border border-slate-200 text-slate-400 flex items-center justify-center active:scale-95" onClick={() => setShowActivityModal(false)}><Icons.X /></button>
                            <div className="space-y-3 pt-6">
                                {(() => {
                                    const userNotifs = (db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
                                    if (userNotifs.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีการแจ้งเตือน</div>;
                                    return userNotifs.map((n, i) => (
                                        <div key={i} onClick={() => markNotifAsRead(n.id)} className={`p-4 rounded-xl border transition-all cursor-pointer ${String(n.isRead) === 'true' ? 'bg-white border-slate-200 opacity-60' : 'bg-blue-50 border-blue-200 shadow-sm'}`}>
                                            <div className="font-bold text-sm text-slate-800 mb-1">{n.title}</div>
                                            <div className="text-xs text-slate-600 mb-2">{n.message}</div>
                                            <div className="text-[10px] text-slate-400">{n.created_at ? new Date(n.created_at).toLocaleString('th-TH') : ''}</div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showManual && (
                <div className="backdrop" onClick={() => setShowManual(false)}>
                    <div className="modal-card bg-white w-[90%] max-w-md rounded-2xl flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-blue-50 rounded-t-2xl flex-shrink-0">
                            <h3 className="font-bold text-blue-800 flex items-center gap-2"><Icons.Book /> คู่มือการใช้งาน</h3>
                            <button className="btn-close-modern" onClick={() => setShowManual(false)}><Icons.X /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50 custom-scrollbar text-sm text-slate-700 leading-relaxed">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2 border-b pb-2 flex items-center gap-2"><span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">1</span> การจองคิว</h4>
                                <ul className="list-disc pl-5 space-y-1 text-xs"><li>แตะที่ช่องว่างในตารางของวันที่และผู้ตรวจที่ต้องการ</li><li>กรอกข้อมูลให้ครบถ้วนแล้วกดบันทึก</li><li><b>สำหรับมือถือ:</b> ปัดลง (Pull down) เพื่อรีเฟรชตาราง</li></ul>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2 border-b pb-2 flex items-center gap-2"><span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">2</span> การแก้ไข/ดูรายละเอียด</h4>
                                <ul className="list-disc pl-5 space-y-1 text-xs"><li>แตะที่กล่องคิวงานที่ต้องการเพื่อดูข้อมูล</li><li>หากเป็นงานของคุณ จะมีปุ่มแก้ไขแสดงขึ้นมา</li><li>งานที่ผ่านไปแล้ว จะไม่สามารถแก้ไขได้ (นอกจาก Admin)</li></ul>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2 border-b pb-2 flex items-center gap-2"><span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs">3</span> สัญลักษณ์สีต่างๆ</h4>
                                <div className="grid grid-cols-2 gap-2 text-[10px] mt-2 font-bold">
                                    <div className="bg-blue-500 text-white p-1.5 rounded text-center">ES1, 3300</div><div className="bg-emerald-500 text-white p-1.5 rounded text-center">5500</div>
                                    <div className="bg-purple-500 text-white p-1.5 rounded text-center">ES5 / ES5.1</div><div className="bg-amber-500 text-white p-1.5 rounded text-center">S-villas</div>
                                    <div className="bg-slate-500 text-white p-1.5 rounded text-center">MOD</div><div className="bg-pink-400 text-white p-1.5 rounded text-center">ตจว.</div>
                                    <div className="bg-yellow-200 text-yellow-800 p-1.5 rounded text-center col-span-2">Re-Ins / Temp / Builder</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLogin && (
                <div className="backdrop z-[200]">
                    <div className="bg-white w-[90%] max-w-sm rounded-3xl p-8 shadow-2xl relative animate-pop overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-red-500"></div>
                        <button className="absolute top-4 right-4 text-slate-400 bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all" onClick={() => { setShowLogin(false); setIsRegisterMode(false); setIsForgotMode(false); }}><Icons.X /></button>
                        
                        <div className="text-center mb-8 pt-4">
                            <div className="w-16 h-16 bg-slate-900 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4 transform rotate-3"><h1 className="text-2xl font-black text-white">SAIS</h1></div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{isForgotMode ? 'กู้คืนรหัสผ่าน' : (isRegisterMode ? 'สร้างบัญชีใหม่' : 'เข้าสู่ระบบ')}</h2>
                        </div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const u = e.target.username.value.trim(); const p = e.target.password ? e.target.password.value : '';
                            
                            if (isForgotMode) { setLoadingMsg('กำลังส่งคำขอ...'); const ok = await apiAction({ action: 'forgot_password', username: u }, 'กำลังส่งคำขอ...'); if (ok) { setAlertMsg('ระบบได้ส่งรหัสผ่านใหม่ไปยังอีเมลของแอดมินแล้ว โปรดติดต่อแอดมิน'); setIsForgotMode(false); } return; }
                            
                            setLoadingMsg(isRegisterMode ? 'กำลังสร้างบัญชี...' : 'กำลังเข้าสู่ระบบ...');
                            try {
                                const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: isRegisterMode ? 'register' : 'login', username: u, password: p }) });
                                const result = await res.json();
                                if (result.status === 'ok') {
                                    if (isRegisterMode) {
                                        setSuccessModal('สมัครสมาชิกสำเร็จ กรุณารอแอดมินอนุมัติ');
                                        setIsRegisterMode(false);
                                    } else {
                                        setUser(result.data); localStorage.setItem('sais_user', JSON.stringify(result.data)); localStorage.setItem('sais_session_time', Date.now().toString());
                                        setSuccessModal('เข้าสู่ระบบสำเร็จ'); setShowLogin(false);
                                    }
                                } else { setAlertMsg(result.message || 'รหัสผ่านไม่ถูกต้อง'); }
                            } catch(err) { setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                            setLoadingMsg(null);
                        }} className="space-y-4">
                            <div><input type="text" name="username" placeholder="รหัสพนักงาน หรือ ชื่อผู้ใช้" required className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold text-slate-700 placeholder-slate-400" /></div>
                            {!isForgotMode && (
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="รหัสผ่าน" required className="w-full bg-slate-50 border border-slate-200 p-3.5 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all text-sm font-bold text-slate-700 placeholder-slate-400" />
                                    <button type="button" className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                                </div>
                            )}
                            
                            {!isRegisterMode && !isForgotMode && <div className="text-right"><button type="button" onClick={() => setIsForgotMode(true)} className="text-[11px] font-bold text-blue-500 hover:text-blue-700">ลืมรหัสผ่าน?</button></div>}
                            
                            <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black rounded-xl shadow-lg active:scale-95 transition-all text-sm mt-2">{isForgotMode ? 'รีเซ็ตรหัสผ่าน' : (isRegisterMode ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ')}</button>
                        </form>
                        
                        <div className="mt-6 text-center">
                            {!isForgotMode ? (
                                <p className="text-xs text-slate-500 font-bold">{isRegisterMode ? 'มีบัญชีอยู่แล้ว?' : 'ยังไม่มีบัญชี?'} <button onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-blue-600 underline ml-1">{isRegisterMode ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</button></p>
                            ) : (
                                <button onClick={() => setIsForgotMode(false)} className="text-xs font-bold text-slate-500 hover:text-slate-800">กลับไปหน้าเข้าสู่ระบบ</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {alertMsg && (
                <div className="backdrop z-[600]">
                    <div className="bg-white w-[85%] max-w-[320px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-t-4 border-red-500">
                        <div className="mx-auto w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-3"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                        <p className="text-sm text-slate-600 mb-6">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl active:scale-95 transition-all">ตกลง</button>
                    </div>
                </div>
            )}

            {confirmDialog && (
                <div className="backdrop z-[600]">
                    <div className="bg-white w-[85%] max-w-[320px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-t-4 border-amber-500">
                        <div className="mx-auto w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-3"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยันการทำรายการ</h3>
                        <p className="text-sm text-slate-600 mb-6 whitespace-pre-wrap">{confirmDialog.msg}</p>
                        <div className="flex gap-2">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl active:scale-95 transition-all">ยกเลิก</button>
                            <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {promptDialog && (
                <div className="backdrop z-[600]">
                    <div className="bg-white w-[85%] max-w-[320px] rounded-3xl p-6 shadow-2xl animate-pop border-t-4 border-blue-500 text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">เหตุผลการยกเลิก</h3>
                        <p className="text-xs text-slate-500 mb-4">{promptDialog.msg}</p>
                        <input type="text" id="promptInput" className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none mb-6 font-bold" placeholder="ระบุเหตุผลที่นี่..." autoFocus />
                        <div className="flex gap-2">
                            <button onClick={() => setPromptDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl active:scale-95 transition-all">ยกเลิก</button>
                            <button onClick={() => { const val = document.getElementById('promptInput').value; if(!val.trim()) return setAlertMsg('กรุณาระบุเหตุผล'); setPromptDialog(null); promptDialog.onSubmit(val); }} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

class ErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { hasError: false, errorMsg: '' }; }
    static getDerivedStateFromError(error) { return { hasError: true, errorMsg: error.toString() }; }
    componentDidCatch(error, errorInfo) { console.error("Error caught:", error, errorInfo); }
    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                    <div className="text-red-500 mb-4">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">ระบบขัดข้องชั่วคราว</h2>
                    <p className="text-sm text-slate-500 mb-6 bg-slate-200 p-3 rounded-lg max-w-md break-words">{this.state.errorMsg}</p>
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95">โหลดหน้าเว็บใหม่</button>
                </div>
            );
        }
        return this.props.children;
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(<ErrorBoundary><App /></ErrorBoundary>);
