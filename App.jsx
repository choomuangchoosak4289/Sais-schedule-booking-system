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
                            if (d.isGlobalHoliday && cellTasks.length === 0) cellHolidayClass = 'is-holiday-cell';
                            else if (d.isGlobalEvent && cellTasks.length === 0 && !hasLeave) cellHolidayClass = 'is-global-event-cell';

                            const cellClassName = `grid-cell hover:opacity-90 flex flex-col ${cellHolidayClass} ${d.isToday ? 'is-today-row' : ''}`;

                            return (
                                <div key={idx} 
                                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, d.full, ins.name)}
                                    className={cellClassName}
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

                                    {d.isGlobalHoliday && d.globalHolidays.map((gh, ghi) => {
                                        const isCard = cellTasks.length > 0;
                                        return (
                                            <div key={'gh'+ghi} 
                                                draggable={isAdmin}
                                                onDragStart={(e) => handleDragStart(e, gh.id)}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 bg-[#D0021B] text-white ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`} 
                                                style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                                onClick={(e) => { e.stopPropagation(); isAdmin ? setModal({ type: 'task_action', data: gh }) : setModal({ type: 'detail', data: gh }); }}
                                            >
                                                {gh.site_name}
                                            </div>
                                        );
                                    })}

                                    {d.isGlobalEvent && !hasLeave && d.globalEvents.map((ge, gei) => {
                                        const isCard = cellTasks.length > 0;
                                        return (
                                            <div key={'ge'+gei} 
                                                draggable={isAdmin}
                                                onDragStart={(e) => handleDragStart(e, ge.id)}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 bg-[#22c55e] text-white ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`} 
                                                style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                                onClick={(e) => { e.stopPropagation(); isAdmin ? setModal({ type: 'task_action', data: ge }) : setModal({ type: 'detail', data: ge }); }}
                                            >
                                                {ge.site_name}
                                            </div>
                                        );
                                    })}
                                    
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

            {/* 📍 ปรับแก้โลโก้ในหน้า Login ตามคำขอครับ */}
            {showLogin && (
                <div className="backdrop z-[200]">
                    <div className="bg-white w-[90%] max-w-sm rounded-3xl p-8 shadow-2xl relative animate-pop overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-red-500"></div>
                        <button className="absolute top-4 right-4 text-slate-400 bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all" onClick={() => { setShowLogin(false); setIsRegisterMode(false); setIsForgotMode(false); }}><Icons.X /></button>
                        
                        <div className="text-center mb-8 pt-4">
                            <div className="mb-4">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">SAIS</h1>
                                <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mt-1">Schedule Booking System</h2>
                            </div>
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
