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
    Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0 2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06-.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    AnimatedTrash: ({ isHovered }) => (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <g style={{ transformOrigin: '100% 20%', transform: isHovered ? 'rotate(35deg) translate(2px, -2px)' : 'rotate(0deg)', transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </g>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    )
};

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
    'ES1': 'bg-blue-500', '3300': 'bg-blue-400', '5500': 'bg-emerald-500', 'ES5/ES5.1': 'bg-purple-500',
    'S-villas': 'bg-amber-500', 'ES2': 'bg-pink-500', 'ES3': 'bg-indigo-500',
    'MOR-R': 'bg-rose-500', 'MOD-T': 'bg-orange-500', 'S7R4': 'bg-cyan-500', 'Flex7': 'bg-teal-600', 
    'ESC/MW': 'bg-fuchsia-500', 'อื่นๆโปรดระบุ': 'bg-slate-500'
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

const CalendarGrid = React.memo(({ daysInView, db, isAdmin, user, setShowLogin, setModal, setAlertMsg, handleDrop, handleDragOver, handleDragLeave, handleDragStart, handleDragEnd, setConfirmDialog, apiAction, setQuickAddType, filteredBookings, tableFontScale, columnZoom, specialFontScale, isExporting, setEventStartDate, setEventEndDate, setEventInspector, setLeaveStartDate, setLeaveEndDate, setLeaveInspector }) => {
    
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
    
    const gridCols = isExporting ? `60px repeat(${numInspectors}, 300px)` : `45px repeat(${numInspectors}, ${colWidthPx}px)`;

    return (
        <div id="calendar-export-area" className={`calendar-grid ${isExporting ? 'export-mode' : ''}`} style={{ gridTemplateColumns: gridCols, width: 'max-content', minWidth: '100%', backgroundColor: isExporting ? '#cbd5e1' : undefined }}>
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
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 bg-[#D0021B] text-white ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`} 
                                                style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                                onClick={(e) => { e.stopPropagation();
                                                    isAdmin ? setModal({ type: 'task_action', data: gh }) : setModal({ type: 'detail', data: gh });
                                                }}
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
                                                onDragEnd={handleDragEnd}
                                                className={isCard ? `task-content relative w-full flex items-center justify-center p-1 rounded-md mb-1 bg-[#22c55e] text-white ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}` : `holiday-label-new flex-1 flex items-center justify-center text-white text-center ${isAdmin ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}`} 
                                                style={{ fontSize: `${(isExporting ? 14 : 12) * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                                onClick={(e) => { e.stopPropagation();
                                                    isAdmin ? setModal({ type: 'task_action', data: ge }) : setModal({ type: 'detail', data: ge });
                                                }}
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
                                                onDragEnd={handleDragEnd}
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
    const [editInspector, setEditInspector] = useState(null);
    
    const [isDragging, setIsDragging] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);
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
        } 
        catch(e) { return null; } 
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
    
    const [areaSelection, setAreaSelection] = useState('');
    const [jobTypeSelection, setJobTypeSelection] = useState('');
    const [productLineSelection, setProductLineSelection] = useState(''); 
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

    // 📍 เมื่อเปิดหน้าต่าง Modal คิวงาน ให้ตรวจสอบและดึง Google Maps ทันที
    useEffect(() => {
        if (modal && modal.type === 'booking') {
            const currentArea = areaSelection === 'other' ? (modal.data?.area || 'ไม่ระบุ') : areaSelection;
            handleMapChange(currentArea);
        }
    }, [modal, areaSelection]);

    const getDiffLog = (oldData, newData, actionUser) => {
        const site = newData?.site_name || oldData?.site_name || '-';
        const eq = newData?.equipment_no || oldData?.equipment_no || '-';
        const pl = newData?.product_line || oldData?.product_line || '-';
        const jt = newData?.job_type || oldData?.job_type || '-';
        const inspector = newData?.inspector_name || oldData?.inspector_name || '-';
        const dateStr = newData?.date ? formatSafeDate(newData.date) : (oldData?.date ? formatSafeDate(oldData.date) : '-');
        
        let userFullName = actionUser || '-';
        if (adminDb && adminDb.users) {
            const userObj = adminDb.users.find(u => String(u.username) === String(actionUser));
            if (userObj && userObj.full_name) userFullName = `${userObj.full_name} (${actionUser})`;
        }

        if (!oldData) {
            return `[เพิ่มรายการใหม่]\nหัวข้อ/โครงการ: ${site}\nประเภทงาน: ${jt}\nEq No.: ${eq}\nผู้ตรวจ: ${inspector}\nวันที่ทำรายการ: ${dateStr}\nผู้ทำการ: ${userFullName}`;
        }
        
        let changes = [];
        const labels = {
            date: 'วันที่', inspector_name: 'ผู้ตรวจ', site_name: 'หัวข้อ/โครงการ',
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
        return changes.length > 0 ? `[อัปเดตข้อมูล]\nหัวข้อ/โครงการ: ${site}\nประเภทงาน: ${jt}\nผู้ทำการ: ${userFullName}\nรายละเอียดการเปลี่ยนแปลง:\n${changes.join('\n')}` : `บันทึกการแก้ไขโดยไม่มีการเปลี่ยนแปลง (หัวข้อ: ${site})`;
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
                } 
                catch(e) {}
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
                const logDetail = `[ลบรายการ]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${booking.site_name || '-'}\nEq No.: ${booking.equipment_no || '-'}\nProduct: ${booking.product_line || '-'}\nประเภทงาน: ${booking.job_type || '-'}\nวันที่: ${booking.date ? formatSafeDate(booking.date) : '-'}`;
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
            } else { setAlertMsg('อัปโหลดไม่สำเร็จ');
            }
        } catch(err) { setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลด');
        }
        setLoadingMsg(null); setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    const handleDragStart = (e, taskId) => { 
        e.dataTransfer.setData('taskId', taskId);
        setIsDragging(true); 
    };

    const handleDragOver = (e) => { 
        e.preventDefault(); 
        e.currentTarget.classList.add('drag-over'); 
    };

    const handleDragLeave = (e) => { 
        e.currentTarget.classList.remove('drag-over'); 
    };

    const handleDragEnd = (e) => {
        setIsDragging(false);
        setIsTrashHovered(false);
    };

    const handleTrashDragOver = (e) => {
        e.preventDefault();
        if (!isTrashHovered) setIsTrashHovered(true);
    };

    const handleTrashDragLeave = (e) => {
        setIsTrashHovered(false);
    };

    const handleTrashDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);
        setIsTrashHovered(false);
        
        if (!isAdmin) return;
        const taskId = e.dataTransfer.getData('taskId');
        const task = db.bookings.find(b => String(b.id) === String(taskId));
        if (!task) return;
        setConfirmDialog({
            msg: `คุณกำลังลากการ์ดทิ้งลงถังขยะ\nยืนยันลบข้อมูลนี้ใช่หรือไม่?\n\n📌 รายการ: ${task.site_name || task.equipment_no}`,
            onConfirm: async () => {
                setConfirmDialog(null);
                const logDetail = `[ลบรายการด้วย Drag & Drop ถังขยะ]\nโดย: ${user?.username || 'admin'}\nโครงการ: ${task.site_name || '-'}\nEq No.: ${task.equipment_no || '-'}`;
                const ok = await apiAction({ action: 'delete_booking', id: task.id, user: user?.username || 'admin', reason: logDetail }, 'กำลังลบทิ้ง...');
                if(ok) { setSuccessModal('ลบรายการลงถังขยะสำเร็จ'); }
            }
        });
    };

    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        if (!isAdmin) return setAlertMsg('เฉพาะแอดมินที่สามารถลากย้ายคิวได้ครับ');
        
        const taskId = e.dataTransfer.getData('taskId');
        const task = db.bookings.find(b => String(b.id) === String(taskId));
        if (!task) return;
        const jobTypeLower = String(task.job_type).toLowerCase();
        const isSpecial = jobTypeLower.includes('leave') || jobTypeLower.includes('event') || jobTypeLower.includes('holiday');
        
        let finalInspector = targetInspector;
        if (task.inspector_name === 'SYSTEM_EVENT') finalInspector = 'SYSTEM_EVENT';
        if (task.inspector_name === 'SYSTEM_HOLIDAY') finalInspector = 'SYSTEM_HOLIDAY';

        const oldDate = task.date ? formatSafeDate(task.date) : 'ไม่ระบุ';
        const oldInspector = task.inspector_name;

        if (oldDate === targetDate && oldInspector === finalInspector) return;
        if (!isSpecial) {
            const isDup = db.bookings.some(b => formatSafeDate(b.date) === targetDate && String(b.equipment_no) === String(task.equipment_no) && b.id !== taskId);
            if (isDup) return setAlertMsg('ไม่สามารถย้ายได้ เนื่องจาก Eq No. นี้ถูกจองไปแล้วในวันที่คุณเลือก');
        }

        let confirmMsgNode = (
            <div className="text-left mt-2">
                <div className="text-sm font-black text-slate-800 mb-3 text-center bg-slate-100 p-2 rounded-lg">
                    📌 {task.site_name || task.equipment_no}
                </div>
                <div className="space-y-2">
                    {oldDate !== targetDate && (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                            <span className="text-slate-500 font-bold">📅 วันที่:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-red-500 line-through decoration-red-300">{oldDate}</span>
                                <span>➡️</span>
                                <span className="text-green-600 font-black">{targetDate}</span>
                            </div>
                        </div>
                    )}
                    {oldInspector !== finalInspector && finalInspector !== 'SYSTEM_EVENT' && finalInspector !== 'SYSTEM_HOLIDAY' && (
                        <div className="flex items-center justify-between text-xs bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                            <span className="text-slate-500 font-bold">👤 ผู้ตรวจ:</span>
                            <div className="flex items-center gap-2">
                                <span className="text-red-500 line-through decoration-red-300">{oldInspector}</span>
                                <span>➡️</span>
                                <span className="text-blue-600 font-black">{finalInspector}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
        setConfirmDialog({
            msg: confirmMsgNode,
            onConfirm: async () => {
                setConfirmDialog(null);
                const logDetail = `[ย้ายการ์ดด้วยวิธี Drag & Drop]\nโดย: ${user?.username || '-'}\nหัวข้อ: ${task.site_name || task.equipment_no}\nรายละเอียดการย้าย:\n• วันที่: [${oldDate}] ➡️ [${targetDate}]\n• ผู้ตรวจ: [${oldInspector}] ➡️ [${finalInspector}]`;
                
                const ok = await apiAction({ 
                    action: 'update_booking', 
                    id: taskId, 
                    date: targetDate, 
                    inspector_name: finalInspector, 
                    user: user?.username || 'admin', 
                    reason: logDetail 
                }, 'กำลังย้ายข้อมูล...');
                
                if (ok) setSuccessModal('ลากย้ายรายการสำเร็จเรียบร้อย');
            }
        });
    };

    const filteredBookings = useMemo(() => { 
        return (db.bookings || []).filter(b => { 
            if (filterArea === 'All') return true; 
            return String(b.area || '') === filterArea; 
        }); 
    }, [db.bookings, filterArea]);

    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newTitle = fd.get('site_name'); const newInspector = fd.get('inspector_name'); const newDate = fd.get('date');
        const logDetail = `[แก้ไขคิวพิเศษ]\nโดย: ${user?.username}\nเปลี่ยนวันที่เป็น ${newDate}\nผู้ตรวจ: ${newInspector}\nหัวข้อ: ${newTitle}`;
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
        if(ok) { 
            setSuccessModal('อัปเดตสำเร็จ');
            if (modal.returnTo) {
                setModal({ type: modal.returnTo });
            } else {
                setModal(null);
            }
        }
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : (fd.get('area') || areaSelection);
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : (fd.get('product_line') || productLineSelection);
        let finalJobType = fd.get('job_type') || jobTypeSelection;

        if (!finalProductLine || finalProductLine === '') return setAlertMsg('กรุณาเลือก Product Line');
        if (!finalJobType || finalJobType === '') return setAlertMsg('กรุณาเลือก ประเภทงาน');
        if (!finalArea || finalArea === '') return setAlertMsg('กรุณาเลือก พื้นที่');

        const isAdminOverride = fd.get('isAdminOverride') === 'true' || modal?.data?.isAdminOverride === true || (isAdmin && modal?.data?.id);
        const targetInspector = isAdminOverride ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isAdminOverride ? fd.get('admin_date_target') : modal?.data?.date;
        const isPastDate = targetDate < todayLocalString;
        if (isPastDate && !isAdmin && modal?.data?.id && quickAddType === 'job') return setAlertMsg('🔒 ไม่อนุญาตให้แก้ไขข้อมูลงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        if (!targetInspector || !targetDate) return setAlertMsg('ข้อมูลวันหรือผู้ตรวจไม่ครบถ้วน กรุณาเลือกวันที่และผู้ตรวจให้ชัดเจน');

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
        const targetInspectorObj = (db.inspectors || []).find(i => i.name === targetInspector);
        let allowedCerts = ['ES1', '3300', 'S-villas'];
        if (targetInspectorObj && targetInspectorObj.product_lines && targetInspectorObj.product_lines.trim() !== '') {
            allowedCerts = targetInspectorObj.product_lines.split(',').map(s => s.trim());
        }
        if (!allowedCerts.includes(finalProductLine) && finalProductLine !== 'ไม่ระบุ') {
            return setAlertMsg(`ผู้ตรวจ "${targetInspector}" ไม่ได้รับสิทธิ์ให้ตรวจ Product Line: ${finalProductLine}\n(สิทธิ์ปัจจุบัน: ${allowedCerts.join(', ')})`);
        }

        if (!isAdmin && !/^\d{10}$/.test(data.tel)) return setAlertMsg('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก');
        if (isAdmin && data.tel && !/^\d{10}$/.test(data.tel)) return setAlertMsg('เบอร์โทรศัพท์ต้องมี 10 หลัก (หรือเว้นว่างไว้)');

        const jStart = fd.get('job_start_time'); const jEnd = fd.get('job_end_time');
        if (jStart && jEnd && jStart >= jEnd) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นในวันเดียวกัน");
        let finalSiteName = data.site_name;
        if (jStart && jEnd) finalSiteName = `${jStart}-${jEnd} ${finalSiteName}`;

        const payload = {
            action: modal?.data?.id ? 'update_booking' : 'create_booking',
            ...data, site_name: finalSiteName, tel: String(data.tel || ''), area: finalArea, job_type: finalJobType, product_line: finalProductLine,
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
                setAreaSelection(''); 
                setJobTypeSelection(''); 
                setProductLineSelection('');
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
            
            <div 
                className={`trash-dropzone ${isDragging ? 'visible' : ''} ${isTrashHovered ? 'hovered' : ''}`}
                onDragOver={handleTrashDragOver}
                onDragLeave={handleTrashDragLeave}
                onDrop={handleTrashDrop}
            >
                <div className="trash-icon-wrapper">
                    <Icons.AnimatedTrash isHovered={isTrashHovered} />
                </div>
                <div className="trash-text">
                    {isTrashHovered ? 'ปล่อยเพื่อลบทิ้ง!' : 'ลากมาทิ้งที่นี่'}
                </div>
            </div>

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

                    <button className="btn-icon relative" onClick={() => { setShowActivityModal(true); if(!hasLoadedAdmin) fetchAdminData(); }}>
                        <Icons.Bell />
                        {unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                    </button>
                    
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
                                handleDragLeave={handleDragLeave} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} setConfirmDialog={setConfirmDialog} 
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
                                            <div><span className="text-slate-400 text-[10px] block">ผู้ตรวจ</span> <span className="font-bold text-slate-700">{h.inspector_name || '-'}</span></div>
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
            {currentView === 'my_bookings' && user && !isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4"><Icons.List /> งานของฉัน</h2>
                        <div className="flex bg-slate-200/70 p-1.5 rounded-xl text-sm font-bold shadow-inner border border-slate-200">
                            <button className={`flex-1 py-2 rounded-lg transition-all ${myBookingsTab === 'pending' ? 'bg-white shadow-md text-blue-600' : 'text-slate-500 active:scale-95'}`} onClick={() => setMyBookingsTab('pending')}>รอตรวจ / กำลังดำเนินการ</button>
                            <button className={`flex-1 py-2 rounded-lg transition-all ${myBookingsTab === 'history' ? 'bg-white shadow-md text-slate-700' : 'text-slate-500 active:scale-95'}`} onClick={() => setMyBookingsTab('history')}>ประวัติงานที่ผ่านมา</button>
                        </div>
                    </div>
                    <div className="space-y-3 pb-10 mt-2">
                        {(() => {
                            let myTasks = (db.bookings || []).filter(b => b.created_by === user.username && String(b.status) !== 'cancelled');
                            if (myBookingsTab === 'pending') { myTasks = myTasks.filter(b => b.date && formatSafeDate(b.date) >= todayLocalString); } 
                            else { myTasks = myTasks.filter(b => b.date && formatSafeDate(b.date) < todayLocalString); }
                            
                            myTasks.sort((a, b) => {
                                const da = new Date(a.date); const db = new Date(b.date);
                                return myBookingsTab === 'pending' ? da - db : db - da;
                            });

                            if (myTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">ไม่มีรายการงาน{myBookingsTab === 'pending' ? 'ในอนาคต' : 'ที่ผ่านมา'}</div>;
                            
                            return (
                                <>
                                    {myTasks.slice(0, myBookingsLimit).map((h, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden" onClick={() => setModal({ type: 'detail', data: h })}>
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
                                            <div className="flex justify-between items-start mb-2 pl-2">
                                                <div className="font-bold text-slate-800 text-sm truncate pr-2">{h.site_name || '-'}</div>
                                                <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 border border-slate-100 ml-2">
                                                <div><span className="text-slate-400 text-[10px] block">Eq No.</span> <span className="font-bold text-slate-700">{h.equipment_no || '-'}</span></div>
                                                <div><span className="text-slate-400 text-[10px] block">ผู้ตรวจ</span> <span className="font-bold text-slate-700">{h.inspector_name || '-'}</span></div>
                                                <div><span className="text-slate-400 text-[10px] block">Unit</span> <span className="font-bold text-slate-700">{h.unit_no || '-'}</span></div>
                                                <div><span className="text-slate-400 text-[10px] block">พื้นที่</span> <span className="font-bold text-slate-700">{h.area || '-'}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                    {myTasks.length > myBookingsLimit && (
                                        <button className="w-full py-3 mt-4 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl border border-slate-200 active:scale-95" onClick={() => setMyBookingsLimit(prev => prev + 20)}>โหลดเพิ่มเติม...</button>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {currentView === 'admin' && isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-3"><Icons.Shield /> จัดการระบบ</h2>
                        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                            {[{ id: 'menu', label: 'เมนู' }, { id: 'bookings', label: 'คิวทั้งหมด' }, { id: 'users', label: 'ผู้ใช้' }, { id: 'inspectors', label: 'ผู้ตรวจ' }, { id: 'logs', label: 'ประวัติ' }, { id: 'leaves', label: 'ลางาน' }, { id: 'events', label: 'กิจกรรม' }, { id: 'holidays', label: 'วันหยุด' }].map(tab => (
                                <button key={tab.id} className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm ${adminTab === tab.id ? 'bg-slate-800 text-white border-none' : 'bg-white text-slate-600 border border-slate-200 active:scale-95'}`} onClick={() => setAdminTab(tab.id)}>{tab.label}</button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-4 pb-10">
                        {!hasLoadedAdmin ? (
                            <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4"><Icons.Loader /> กำลังโหลดข้อมูลผู้ดูแล...</div>
                        ) : adminTab === 'menu' ? (
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-transform flex flex-col items-center justify-center text-center gap-2 cursor-pointer" onClick={() => { setQuickAddType('leave'); setModal({ type: 'booking', data: {} }); }}>
                                    <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl"><Icons.CalendarX /></div>
                                    <div><div className="font-bold text-sm text-slate-800">บันทึกวันลา</div><div className="text-[10px] text-slate-500">ลาป่วย, พักร้อน</div></div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-transform flex flex-col items-center justify-center text-center gap-2 cursor-pointer" onClick={() => { setQuickAddType('event'); setModal({ type: 'booking', data: {} }); }}>
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl"><Icons.Book /></div>
                                    <div><div className="font-bold text-sm text-slate-800">กิจกรรมบริษัท</div><div className="text-[10px] text-slate-500">อบรม, ประชุม</div></div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:scale-95 transition-transform flex flex-col items-center justify-center text-center gap-2 cursor-pointer col-span-2" onClick={() => { setQuickAddType('holiday'); setModal({ type: 'booking', data: {} }); }}>
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl"><Icons.Star /></div>
                                    <div><div className="font-bold text-sm text-slate-800">วันหยุดนักขัตฤกษ์</div><div className="text-[10px] text-slate-500">ตั้งค่าวันหยุดให้ทุกคนเห็นในตาราง</div></div>
                                </div>
                            </div>
                        ) : adminTab === 'users' ? (
                            <div className="space-y-3">
                                {(adminDb.users || []).map((u, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                                        <div><div className="font-bold text-slate-800 text-sm">{u.username} <span className="text-xs text-slate-400 font-normal">({u.role})</span></div><div className="text-[10px] text-slate-500">รหัสผ่าน: {u.password}</div></div>
                                    </div>
                                ))}
                            </div>
                        ) : adminTab === 'inspectors' ? (
                            <div className="space-y-3">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-slate-800 text-sm">จัดการรายชื่อผู้ตรวจ</h3>
                                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow flex items-center gap-1 active:scale-95" onClick={() => setEditInspector({ id: null, name: '', product_lines: 'ES1, 3300, S-villas', bg_color: '#3b82f6', text_color: '#ffffff', sequence: (db.inspectors || []).length + 1 })}>
                                        <Icons.Plus /> เพิ่ม
                                    </button>
                                </div>
                                {editInspector && (
                                    <div className="bg-white p-4 rounded-xl shadow border-2 border-blue-400 mb-4 animate-pop">
                                        <h4 className="font-bold text-sm text-slate-800 mb-3">{editInspector.id ? 'แก้ไขผู้ตรวจ' : 'เพิ่มผู้ตรวจใหม่'}</h4>
                                        <div className="space-y-3">
                                            <div><label className="text-[10px] font-bold text-slate-500 block mb-1">ชื่อผู้ตรวจ</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none" value={editInspector.name} onChange={e => setEditInspector({...editInspector, name: e.target.value})} placeholder="ระบุชื่อผู้ตรวจ..." /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 block mb-1">สิทธิ์ Product Line (คั่นด้วยลูกน้ำ)</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none" value={editInspector.product_lines} onChange={e => setEditInspector({...editInspector, product_lines: e.target.value})} placeholder="ES1, 3300, ..." /></div>
                                            <div className="flex gap-2 justify-end mt-4">
                                                <button className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg text-xs" onClick={() => setEditInspector(null)}>ยกเลิก</button>
                                                <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-xs" onClick={async () => {
                                                    if (!editInspector.name.trim()) return setAlertMsg('กรุณาระบุชื่อผู้ตรวจ');
                                                    const logDetail = `[จัดการผู้ตรวจ]\nโดย: ${user.username}\nการกระทำ: ${editInspector.id ? 'แก้ไข' : 'เพิ่ม'}\nชื่อ: ${editInspector.name}`;
                                                    const ok = await apiAction({ action: 'manage_inspector', inspector: editInspector, user: user.username, reason: logDetail }, 'กำลังบันทึก...');
                                                    if (ok) { setSuccessModal('บันทึกสำเร็จ'); setEditInspector(null); await fetchCoreData(false, null); }
                                                }}>บันทึก</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(db.inspectors || []).sort((a,b)=>a.sequence-b.sequence).map((ins, i) => (
                                    <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                                        <div><div className="font-bold text-slate-800 text-sm flex items-center gap-2"><div className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white" style={{backgroundColor: ins.bg_color}}>{ins.sequence}</div> {ins.name}</div><div className="text-[10px] text-slate-500 mt-1 pl-8">Products: {ins.product_lines || '-'}</div></div>
                                        <div className="flex gap-1">
                                            <button className="p-2 text-blue-500 bg-blue-50 rounded-lg" onClick={() => setEditInspector(ins)}><Icons.Edit /></button>
                                            <button className="p-2 text-red-500 bg-red-50 rounded-lg" onClick={() => {
                                                setConfirmDialog({
                                                    msg: `ยืนยันลบผู้ตรวจ: ${ins.name} ?`,
                                                    onConfirm: async () => { setConfirmDialog(null); const ok = await apiAction({ action: 'delete_inspector', id: ins.id, user: user.username, reason: `[ลบผู้ตรวจ] ${ins.name}` }, 'กำลังลบ...'); if(ok) { setSuccessModal('ลบสำเร็จ'); await fetchCoreData(false, null); } }
                                                });
                                            }}><Icons.Trash /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : adminTab === 'bookings' ? (
                            <div className="space-y-3">
                                {(() => {
                                    const bList = (adminDb.all_bookings || []).filter(b => String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.inspector_name) !== 'SYSTEM_EVENT' && !String(b.equipment_no).startsWith('LEAVE_') && !String(b.equipment_no).startsWith('EVENT_') && String(b.status) !== 'cancelled').sort((a, b) => new Date(b.date) - new Date(a.date));
                                    if (bList.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการจองคิว</div>;
                                    return (
                                        <>
                                            {bList.slice(0, adminBookingsLimit).map((h, i) => (
                                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>
                                                    <div className="flex justify-between items-start mb-2"><div className="font-bold text-slate-800 text-sm truncate">{h.site_name || '-'}</div><div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{h.date ? formatSafeDate(h.date) : '-'}</div></div>
                                                    <div className="text-[10px] text-slate-500">Eq No.: {h.equipment_no} | ผู้ตรวจ: {h.inspector_name} | ผจก.: {h.created_by}</div>
                                                </div>
                                            ))}
                                            {bList.length > adminBookingsLimit && (
                                                <button className="w-full py-3 mt-4 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl border border-slate-200 active:scale-95" onClick={() => setAdminBookingsLimit(prev => prev + 20)}>โหลดเพิ่มเติม...</button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        ) : adminTab === 'logs' ? (
                            <div className="space-y-3">
                                <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-2 shadow-sm mb-4">
                                    <div className="text-slate-400 mr-2"><Icons.Search /></div>
                                    <input type="text" placeholder="ค้นหาประวัติ..." className="w-full text-xs outline-none border-none bg-transparent font-bold text-slate-700" value={logSearchQuery} onChange={(e) => setLogSearchQuery(e.target.value)} />
                                    {logSearchQuery && <button onClick={() => setLogSearchQuery('')} className="text-slate-400"><Icons.X /></button>}
                                </div>
                                {(() => {
                                    const logsList = (adminDb.logs || []).filter(l => {
                                        if(!logSearchQuery) return true;
                                        const s = logSearchQuery.toLowerCase();
                                        return String(l.action).toLowerCase().includes(s) || String(l.details).toLowerCase().includes(s) || String(l.user).toLowerCase().includes(s);
                                    });
                                    if(logsList.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีประวัติการทำรายการ</div>;
                                    return (
                                        <>
                                            {logsList.slice(0, logsLimit).map((l, i) => (
                                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                                    <div className="flex justify-between items-center mb-2 border-b border-slate-100 pb-2"><div className="font-bold text-blue-600 text-xs">{l.action}</div><div className="text-[10px] text-slate-400">{new Date(l.timestamp).toLocaleString('th-TH')}</div></div>
                                                    <div className="text-[10px] text-slate-600 whitespace-pre-wrap leading-relaxed">{l.details}</div>
                                                    <div className="text-[9px] text-slate-400 mt-2 text-right">โดย: {l.user}</div>
                                                </div>
                                            ))}
                                            {logsList.length > logsLimit && (
                                                <button className="w-full py-3 mt-4 text-xs font-bold text-slate-500 bg-slate-100 rounded-xl border border-slate-200 active:scale-95" onClick={() => setLogsLimit(prev => prev + 20)}>โหลดเพิ่มเติม...</button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        ) : adminTab === 'leaves' ? (
                            <div className="space-y-3">
                                {selectedLeavesToDelete.length > 0 && (
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex justify-between items-center mb-3 sticky top-14 z-20">
                                        <div className="text-red-600 text-xs font-bold">เลือกแล้ว {selectedLeavesToDelete.length} รายการ</div>
                                        <button className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg active:scale-95" onClick={() => handleBulkDelete('leave', selectedLeavesToDelete)}>ลบที่เลือก</button>
                                    </div>
                                )}
                                {(() => {
                                    const lList = (adminDb.all_bookings || []).filter(b => String(b.job_type).toLowerCase() === 'leave' || String(b.equipment_no).toLowerCase().startsWith('leave_') || String(b.equipment_no).includes('ลา') || String(b.site_name).includes('ลา') ).sort((a, b) => new Date(b.date) - new Date(a.date));
                                    if (lList.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการลางาน</div>;
                                    return lList.map((h, i) => {
                                        const isChecked = selectedLeavesToDelete.includes(h.id);
                                        return (
                                            <div key={i} className={`bg-white p-3 rounded-xl shadow-sm border flex items-center gap-3 transition-all ${isChecked ? 'border-red-400 bg-red-50/30' : 'border-slate-200'}`} onClick={() => setSelectedLeavesToDelete(prev => prev.includes(h.id) ? prev.filter(id => id !== h.id) : [...prev, h.id])}>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300'}`}>{isChecked && <Icons.Check />}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start"><div className="font-bold text-slate-800 text-sm truncate pr-2">{h.site_name || '-'}</div><div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex-shrink-0">{h.date ? formatSafeDate(h.date) : '-'}</div></div>
                                                    <div className="text-[10px] text-slate-500 mt-1">ผู้ตรวจ: {h.inspector_name} | ผู้ลงบันทึก: {h.created_by}</div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        ) : adminTab === 'events' ? (
                            <div className="space-y-3">
                                {selectedEventsToDelete.length > 0 && (
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex justify-between items-center mb-3 sticky top-14 z-20">
                                        <div className="text-red-600 text-xs font-bold">เลือกแล้ว {selectedEventsToDelete.length} รายการ</div>
                                        <button className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg active:scale-95" onClick={() => handleBulkDelete('event', selectedEventsToDelete)}>ลบที่เลือก</button>
                                    </div>
                                )}
                                {(() => {
                                    const eList = (adminDb.all_bookings || []).filter(b => String(b.job_type).toLowerCase() === 'company_event' || String(b.equipment_no).toLowerCase().startsWith('event_')).sort((a, b) => new Date(b.date) - new Date(a.date));
                                    if (eList.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการกิจกรรม</div>;
                                    return eList.map((h, i) => {
                                        const isChecked = selectedEventsToDelete.includes(h.id);
                                        return (
                                            <div key={i} className={`bg-white p-3 rounded-xl shadow-sm border flex items-center gap-3 transition-all ${isChecked ? 'border-red-400 bg-red-50/30' : 'border-slate-200'}`} onClick={() => setSelectedEventsToDelete(prev => prev.includes(h.id) ? prev.filter(id => id !== h.id) : [...prev, h.id])}>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300'}`}>{isChecked && <Icons.Check />}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start"><div className="font-bold text-slate-800 text-sm truncate pr-2">{h.site_name || '-'}</div><div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex-shrink-0">{h.date ? formatSafeDate(h.date) : '-'}</div></div>
                                                    <div className="text-[10px] text-slate-500 mt-1">ผู้ตรวจ: {h.inspector_name === 'SYSTEM_EVENT' ? 'กิจกรรมของบริษัท' : h.inspector_name} | ลงโดย: {h.created_by}</div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        ) : adminTab === 'holidays' ? (
                            <div className="space-y-3">
                                {selectedHolidaysToDelete.length > 0 && (
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex justify-between items-center mb-3 sticky top-14 z-20">
                                        <div className="text-red-600 text-xs font-bold">เลือกแล้ว {selectedHolidaysToDelete.length} รายการ</div>
                                        <button className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg active:scale-95" onClick={() => handleBulkDelete('holiday', selectedHolidaysToDelete)}>ลบที่เลือก</button>
                                    </div>
                                )}
                                {(() => {
                                    const hList = (adminDb.all_bookings || []).filter(b => String(b.inspector_name) === 'SYSTEM_HOLIDAY').sort((a, b) => new Date(b.date) - new Date(a.date));
                                    if (hList.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการวันหยุดนักขัตฤกษ์</div>;
                                    return hList.map((h, i) => {
                                        const isChecked = selectedHolidaysToDelete.includes(h.id);
                                        return (
                                            <div key={i} className={`bg-white p-3 rounded-xl shadow-sm border flex items-center gap-3 transition-all ${isChecked ? 'border-red-400 bg-red-50/30' : 'border-slate-200'}`} onClick={() => setSelectedHolidaysToDelete(prev => prev.includes(h.id) ? prev.filter(id => id !== h.id) : [...prev, h.id])}>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-red-500 border-red-500 text-white' : 'border-slate-300'}`}>{isChecked && <Icons.Check />}</div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start"><div className="font-bold text-red-600 text-sm truncate pr-2">{h.site_name || '-'}</div><div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded flex-shrink-0">{h.date ? formatSafeDate(h.date) : '-'}</div></div>
                                                </div>
                                            </div>
                                        );
                                    });
                                })()}
                            </div>
                        ) : null}
                    </div>
                </div>
            )}

            {modal && (
                <div className="backdrop z-[400] overflow-y-auto" onClick={() => { if(modal.type !== 'booking' && !uploadingDoc.layout && !uploadingDoc.wiring && !uploadingDoc.precheck) setModal(null); }}>
                    <div className="bg-white w-[90%] max-w-md rounded-2xl p-5 shadow-2xl animate-slide-up my-8 mx-auto relative cursor-default" onClick={e => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 bg-slate-100 p-1.5 rounded-full text-slate-500 hover:bg-slate-200 active:scale-90" onClick={() => setModal(null)}><Icons.X /></button>
                        
                        {modal.type === 'detail' && (
                            <div>
                                <h2 className="text-lg font-black text-slate-800 mb-4 border-b pb-3 pr-8 flex items-center gap-2"><Icons.List /> รายละเอียดคิวงาน</h2>
                                <div className="space-y-3 mb-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold text-sm text-slate-800">{modal.data.date ? formatSafeDate(modal.data.date) : '-'}</span></div>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">ผู้ตรวจ</span><span className="font-bold text-sm text-blue-600">{modal.data.inspector_name === 'SYSTEM_HOLIDAY' ? 'วันหยุด' : modal.data.inspector_name === 'SYSTEM_EVENT' ? 'กิจกรรมบริษัท' : modal.data.inspector_name || '-'}</span></div>
                                    </div>
                                    {String(modal.data.inspector_name) !== 'SYSTEM_HOLIDAY' && String(modal.data.inspector_name) !== 'SYSTEM_EVENT' && !String(modal.data.equipment_no).startsWith('LEAVE_') && !String(modal.data.equipment_no).startsWith('EVENT_') && (
                                        <>
                                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block mb-1">โครงการ / หัวข้องาน</span><span className="font-bold text-sm text-slate-800">{modal.data.site_name || '-'}</span></div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">Eq No.</span><span className="font-bold text-sm text-slate-800">{modal.data.equipment_no || '-'}</span></div>
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">Unit</span><span className="font-bold text-sm text-slate-800">{modal.data.unit_no || '-'}</span></div>
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">ประเภทงาน</span><span className="font-bold text-sm text-slate-800">{modal.data.job_type || '-'}</span></div>
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">พื้นที่</span><span className="font-bold text-sm text-slate-800">{modal.data.area || '-'}</span></div>
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">Product Line</span><span className="font-bold text-sm text-slate-800">{modal.data.product_line || '-'}</span></div>
                                                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block">เบอร์โทรติดต่อ</span><span className="font-bold text-sm text-slate-800">{modal.data.tel || '-'}</span></div>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block mb-2">สถานะเอกสาร (เฉพาะแอดมินแก้ไขได้)</span>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <div className={`text-[10px] p-2 rounded-lg text-center font-bold border ${String(modal.data.layout_doc) === 'true' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-400 border-slate-200'}`}>Layout {String(modal.data.layout_doc) === 'true' ? '✅' : '⏳'}</div>
                                                    <div className={`text-[10px] p-2 rounded-lg text-center font-bold border ${String(modal.data.wiring_doc) === 'true' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-400 border-slate-200'}`}>Wiring {String(modal.data.wiring_doc) === 'true' ? '✅' : '⏳'}</div>
                                                    <div className={`text-[10px] p-2 rounded-lg text-center font-bold border ${String(modal.data.precheck_doc) === 'true' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-white text-slate-400 border-slate-200'}`}>Precheck {String(modal.data.precheck_doc) === 'true' ? '✅' : '⏳'}</div>
                                                </div>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block mb-2">ไฟล์รูปภาพแนบ</span>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {['layout_img', 'wiring_img', 'precheck_img'].map((imgKey, idx) => {
                                                        const label = imgKey === 'layout_img' ? 'Layout' : imgKey === 'wiring_img' ? 'Wiring' : 'Precheck';
                                                        return modal.data[imgKey] ? (
                                                            <div key={idx} className="flex flex-col items-center gap-1">
                                                                <a href={modal.data[imgKey]} target="_blank" rel="noreferrer" className="w-full h-16 bg-slate-200 rounded-lg overflow-hidden border border-slate-300 block relative group">
                                                                    <img src={modal.data[imgKey]} alt={label} className="w-full h-full object-cover" />
                                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Icons.Eye /></div>
                                                                </a>
                                                                <span className="text-[9px] text-slate-500 font-bold">{label}</span>
                                                            </div>
                                                        ) : (
                                                            <div key={idx} className="flex flex-col items-center gap-1">
                                                                <div className="w-full h-16 bg-slate-100 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-xs">ไม่มีไฟล์</div>
                                                                <span className="text-[9px] text-slate-400">{label}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {(String(modal.data.inspector_name) === 'SYSTEM_HOLIDAY' || String(modal.data.inspector_name) === 'SYSTEM_EVENT' || String(modal.data.equipment_no).startsWith('LEAVE_') || String(modal.data.equipment_no).startsWith('EVENT_')) && (
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100"><span className="text-slate-400 text-xs block mb-1">หัวข้อ / รายละเอียด</span><span className="font-bold text-lg text-slate-800">{modal.data.site_name || '-'}</span></div>
                                    )}
                                    <div className="text-right text-[10px] text-slate-400">ลงคิวโดย: {modal.data.created_by || '-'}</div>
                                </div>
                                <div className="flex gap-3">
                                    {(isAdmin || (user && user.username === modal.data.created_by)) && (
                                        <>
                                            <button className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl active:scale-95 text-sm" onClick={() => handleCancelJob(modal.data)}>ยกเลิกคิวงาน</button>
                                            <button className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 shadow-md text-sm" onClick={() => {
                                                const jobTypeLower = String(modal.data.job_type).toLowerCase();
                                                const isSpecial = jobTypeLower.includes('leave') || jobTypeLower.includes('event') || jobTypeLower.includes('holiday');
                                                if (isSpecial) setModal({ type: 'edit_special', data: modal.data, returnTo: 'detail' });
                                                else { setQuickAddType('job'); setModal({ type: 'booking', data: modal.data }); }
                                            }}>แก้ไขข้อมูล</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {modal.type === 'admin_cell_action' && isAdmin && (
                            <div>
                                <h2 className="text-lg font-black text-slate-800 mb-2">เลือกรายการที่ต้องการเพิ่ม</h2>
                                <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">วันที่: {modal.data.date} | คอลัมน์: {modal.data.inspector_name}</p>
                                <div className="space-y-2">
                                    <button className="w-full py-4 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 flex items-center justify-between transition-colors text-sm" onClick={() => { setQuickAddType('job'); setModal({ type: 'booking', data: { date: modal.data.date, inspector_name: modal.data.inspector_name } }); }}>
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"><Icons.FileText /></div> <span>เพิ่มคิวงานปกติ</span></div><Icons.ChevronRight />
                                    </button>
                                    <button className="w-full py-4 px-4 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-bold rounded-xl border border-yellow-200 flex items-center justify-between transition-colors text-sm" onClick={() => { setQuickAddType('leave'); setModal({ type: 'booking', data: { date: modal.data.date, inspector_name: modal.data.inspector_name } }); }}>
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center"><Icons.CalendarX /></div> <span>เพิ่มวันลา / ลากิจ / พักร้อน</span></div><Icons.ChevronRight />
                                    </button>
                                    <button className="w-full py-4 px-4 bg-green-50 hover:bg-green-100 text-green-700 font-bold rounded-xl border border-green-200 flex items-center justify-between transition-colors text-sm" onClick={() => { setQuickAddType('event'); setModal({ type: 'booking', data: { date: modal.data.date, inspector_name: modal.data.inspector_name } }); }}>
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center"><Icons.Book /></div> <span>เพิ่มกิจกรรม (อบรม, ประชุม)</span></div><Icons.ChevronRight />
                                    </button>
                                    <button className="w-full py-4 px-4 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl border border-red-200 flex items-center justify-between transition-colors text-sm" onClick={() => { setQuickAddType('holiday'); setModal({ type: 'booking', data: { date: modal.data.date, inspector_name: 'SYSTEM_HOLIDAY' } }); }}>
                                        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center"><Icons.Star /></div> <span>เพิ่มวันหยุดนักขัตฤกษ์</span></div><Icons.ChevronRight />
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal.type === 'task_action' && (isAdmin || (user && user.username === modal.data.created_by)) && (
                            <div>
                                <h2 className="text-lg font-black text-slate-800 mb-2 truncate pr-6">{modal.data.site_name || modal.data.equipment_no}</h2>
                                <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">วันที่: {modal.data.date ? formatSafeDate(modal.data.date) : '-'} | ลงโดย: {modal.data.created_by}</p>
                                <div className="space-y-2">
                                    <button className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 flex items-center gap-3 transition-colors text-sm shadow-sm" onClick={() => setModal({ type: 'detail', data: modal.data })}>
                                        <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center"><Icons.Eye /></div> ดูรายละเอียดทั้งหมด
                                    </button>
                                    <button className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 flex items-center gap-3 transition-colors text-sm shadow-sm" onClick={() => {
                                        const jobTypeLower = String(modal.data.job_type).toLowerCase();
                                        const isSpecial = jobTypeLower.includes('leave') || jobTypeLower.includes('event') || jobTypeLower.includes('holiday');
                                        if (isSpecial) setModal({ type: 'edit_special', data: modal.data, returnTo: null });
                                        else { setQuickAddType('job'); setModal({ type: 'booking', data: modal.data }); }
                                    }}>
                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><Icons.Edit /></div> แก้ไขข้อมูล / อัปโหลดไฟล์
                                    </button>
                                    {isAdmin && !String(modal.data.job_type).toLowerCase().includes('holiday') && !String(modal.data.job_type).toLowerCase().includes('event') && !String(modal.data.job_type).toLowerCase().includes('leave') && (
                                        <button className="w-full py-4 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 flex items-center gap-3 transition-colors text-sm shadow-sm" onClick={() => {
                                            setQuickAddType('job');
                                            setModal({ type: 'booking', data: { ...modal.data, isAdminOverride: true } });
                                        }}>
                                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center"><Icons.CalendarX /></div> ย้ายคิว / เปลี่ยนผู้ตรวจ
                                        </button>
                                    )}
                                    <button className="w-full py-4 px-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl border border-red-200 flex items-center gap-3 transition-colors text-sm shadow-sm" onClick={() => handleCancelJob(modal.data)}>
                                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center"><Icons.Trash /></div> ลบ / ยกเลิกคิวงาน
                                    </button>
                                </div>
                            </div>
                        )}

                        {modal.type === 'edit_special' && isAdmin && (
                            <form onSubmit={handleEditSpecialSubmit} className="space-y-4">
                                <h2 className="text-lg font-black text-slate-800 mb-4 pb-2 border-b flex items-center gap-2"><Icons.Edit /> แก้ไขรายการพิเศษ</h2>
                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">หัวข้อ / รายละเอียด</label><input type="text" name="site_name" defaultValue={modal.data.site_name} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white" required /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block">วันที่</label><input type="date" name="date" defaultValue={modal.data.date ? formatSafeDate(modal.data.date) : ''} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white" required /></div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-700 mb-1 block">ผู้ตรวจ</label>
                                        <select name="inspector_name" defaultValue={modal.data.inspector_name} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white" required>
                                            <option value="SYSTEM_HOLIDAY">วันหยุดนักขัตฤกษ์</option><option value="SYSTEM_EVENT">กิจกรรมบริษัท</option>
                                            {(db.inspectors || []).map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl" onClick={() => { if(modal.returnTo) setModal({ type: modal.returnTo, data: modal.data }); else setModal(null); }}>ยกเลิก</button>
                                    <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md">บันทึก</button>
                                </div>
                            </form>
                        )}

                        {modal.type === 'booking' && (
                            <form onSubmit={handleBookingSubmit} className="space-y-4 pb-2">
                                <div className="flex justify-between items-center mb-1 pr-6 border-b pb-3">
                                    <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                        {modal.data.id ? <><Icons.Edit /> {isAdmin && modal.data.isAdminOverride ? 'ย้ายคิว / เปลี่ยนผู้ตรวจ' : 'แก้ไขคิวงาน'}</> : quickAddType === 'leave' ? <><Icons.CalendarX /> บันทึกลากิจ/พักร้อน</> : quickAddType === 'event' ? <><Icons.Book /> บันทึกกิจกรรม</> : quickAddType === 'holiday' ? <><Icons.Star /> บันทึกวันหยุด</> : <><Icons.Plus /> จองคิวงาน</>}
                                    </h2>
                                </div>

                                {quickAddType === 'job' && !modal.data.isAdminOverride && (
                                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between mb-4 shadow-sm">
                                        <div><div className="text-[10px] text-blue-500 font-bold">วันที่เลือก</div><div className="font-black text-blue-800">{modal.data.date || '-'}</div></div>
                                        <div className="text-right"><div className="text-[10px] text-blue-500 font-bold">ผู้ตรวจ</div><div className="font-black text-blue-800">{modal.data.inspector_name || '-'}</div></div>
                                    </div>
                                )}

                                {quickAddType === 'job' && isAdmin && modal.data.isAdminOverride && (
                                    <div className="grid grid-cols-2 gap-3 mb-4 bg-purple-50 p-3 rounded-xl border border-purple-200">
                                        <div>
                                            <label className="text-[10px] font-bold text-purple-700 mb-1 block">เปลี่ยนวันที่</label>
                                            <input type="date" name="admin_date_target" defaultValue={modal.data.date ? formatSafeDate(modal.data.date) : ''} className="w-full text-sm p-2 rounded-lg border border-purple-300 outline-none bg-white" required />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-purple-700 mb-1 block">เปลี่ยนผู้ตรวจ</label>
                                            <select name="admin_inspector_target" defaultValue={modal.data.inspector_name} className="w-full text-sm p-2 rounded-lg border border-purple-300 outline-none bg-white" required>
                                                {(db.inspectors || []).map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                                            </select>
                                        </div>
                                        <input type="hidden" name="isAdminOverride" value="true" />
                                    </div>
                                )}

                                {quickAddType === 'job' ? (
                                    <div className="space-y-3 h-[50vh] overflow-y-auto custom-scrollbar pr-2 pb-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="text-xs font-bold text-slate-700 mb-1 block flex justify-between">Eq No. <span className="text-[10px] text-red-500">*</span></label><input type="text" name="equipment_no" defaultValue={modal.data.equipment_no} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-slate-50 focus:bg-white focus:border-blue-500 transition-colors" placeholder="ระบุ Eq No." /></div>
                                            <div><label className="text-xs font-bold text-slate-700 mb-1 block">Unit (ถ้ามี)</label><input type="text" name="unit_no" defaultValue={modal.data.unit_no} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-slate-50 focus:bg-white focus:border-blue-500 transition-colors" placeholder="เช่น Unit 1" /></div>
                                        </div>

                                        <div><label className="text-xs font-bold text-slate-700 mb-1 block flex justify-between">ชื่อโครงการ / Site Name <span className="text-[10px] text-red-500">*</span></label><input type="text" name="site_name" defaultValue={modal.data.site_name ? modal.data.site_name.replace(/^(\d{2}:\d{2})-\d{2}:\d{2}\s/, '') : ''} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-slate-50 focus:bg-white focus:border-blue-500 transition-colors" placeholder="ระบุชื่อโครงการ" /></div>

                                        {isAdmin && (
                                            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                                <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่มงาน (ไม่บังคับ)</label><input type="time" name="job_start_time" className="w-full text-sm p-2 border border-slate-300 rounded-lg outline-none" defaultValue={modal.data.site_name ? (modal.data.site_name.match(/^(\d{2}:\d{2})-\d{2}:\d{2}/) ? modal.data.site_name.match(/^(\d{2}:\d{2})-\d{2}:\d{2}/)[1] : '') : ''} /></div>
                                                <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเลิกงาน (ไม่บังคับ)</label><input type="time" name="job_end_time" className="w-full text-sm p-2 border border-slate-300 rounded-lg outline-none" defaultValue={modal.data.site_name ? (modal.data.site_name.match(/^\d{2}:\d{2}-(\d{2}:\d{2})/) ? modal.data.site_name.match(/^\d{2}:\d{2}-(\d{2}:\d{2})/)[1] : '') : ''} /></div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1 block flex justify-between">Product Line <span className="text-[10px] text-red-500">*</span></label>
                                                {(() => {
                                                    const targetInspectorObj = (db.inspectors || []).find(i => i.name === (modal.data.isAdminOverride ? modal.data.inspector_name : (modal.data.inspector_name || '')));
                                                    let allowedCerts = ['ES1', '3300', 'S-villas', '5500', 'ES5/ES5.1', 'ES2', 'ES3', 'MOR-R', 'MOD-T', 'S7R4', 'Flex7', 'ESC/MW', 'อื่นๆโปรดระบุ'];
                                                    if (targetInspectorObj && targetInspectorObj.product_lines && targetInspectorObj.product_lines.trim() !== '') {
                                                        allowedCerts = [...targetInspectorObj.product_lines.split(',').map(s => s.trim()), 'อื่นๆโปรดระบุ'];
                                                    }
                                                    useEffect(() => { 
                                                        if(modal.data.product_line && allowedCerts.includes(modal.data.product_line)) setProductLineSelection(modal.data.product_line); 
                                                        else if(modal.data.product_line && !allowedCerts.includes(modal.data.product_line)) setProductLineSelection('อื่นๆโปรดระบุ'); 
                                                    }, []);
                                                    
                                                    return (
                                                        <select name="product_line" value={productLineSelection} onChange={e => setProductLineSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                            <option value="" disabled>--เลือก--</option>
                                                            {allowedCerts.map(cert => (
                                                                <option key={cert} value={cert}>{cert}</option>
                                                            ))}
                                                        </select>
                                                    );
                                                })()}
                                                {productLineSelection === 'อื่นๆโปรดระบุ' && (
                                                    <input type="text" name="custom_product_line" defaultValue={modal.data.product_line !== 'ES1' && modal.data.product_line !== '3300' && modal.data.product_line !== 'S-villas' ? modal.data.product_line : ''} placeholder="ระบุ Product..." className="w-full text-sm p-2.5 mt-2 rounded-lg border border-slate-300 outline-none" required />
                                                )}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1 block flex justify-between">ประเภทงาน <span className="text-[10px] text-red-500">*</span></label>
                                                <select name="job_type" value={jobTypeSelection || (modal.data.job_type ? (['New', 'MOD', 'Re-ins temporary power supply', 'Re-ins builder lift'].includes(modal.data.job_type) ? modal.data.job_type : 'New') : '')} onChange={e => setJobTypeSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                    <option value="" disabled>--เลือก--</option>
                                                    <option value="New">New</option>
                                                    <option value="MOD">MOD</option>
                                                    <option value="Re-ins temporary power supply">Re-ins temporary</option>
                                                    <option value="Re-ins builder lift">Re-ins builder lift</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                                            <label className="text-xs font-bold text-slate-700 mb-2 block flex justify-between">พื้นที่ / Area <span className="text-[10px] text-red-500">*</span></label>
                                            <select name="area" value={areaSelection || (modal.data.area ? (modal.data.area === 'กรุงเทพและปริมณฑล' ? 'กรุงเทพและปริมณฑล' : 'other') : '')} onChange={e => { setAreaSelection(e.target.value); handleMapChange(e.target.value); }} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white mb-2">
                                                <option value="" disabled>--เลือก--</option>
                                                <option value="กรุงเทพและปริมณฑล">กรุงเทพและปริมณฑล</option>
                                                <option value="other">ต่างจังหวัด (โปรดระบุ)</option>
                                            </select>
                                            {areaSelection === 'other' && (
                                                <input type="text" name="custom_area" defaultValue={modal.data.area && modal.data.area !== 'กรุงเทพและปริมณฑล' ? modal.data.area : ''} onChange={e => handleMapChange(e.target.value)} placeholder="ระบุจังหวัด..." className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white mb-2" required />
                                            )}
                                            
                                            {liveMapUrl && (
                                                <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative h-32 w-full">
                                                    <iframe src={liveMapUrl} className="w-full h-full border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map Preview"></iframe>
                                                </div>
                                            )}
                                        </div>

                                        <div><label className="text-xs font-bold text-slate-700 mb-1 block">เบอร์โทรศัพท์ (ถ้ามี)</label><input type="tel" name="tel" defaultValue={modal.data.tel} pattern="\d{10}" className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-slate-50 focus:bg-white focus:border-blue-500 transition-colors" placeholder="ระบุเบอร์โทร 10 หลัก" /></div>

                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-3">
                                            <label className="text-xs font-bold text-slate-700 block">อัปโหลดไฟล์รูปภาพแนบ <span className="text-[10px] text-slate-400 font-normal">(ไม่บังคับ)</span></label>
                                            
                                            {['layout', 'wiring', 'precheck'].map((docKey) => {
                                                const dbKey = `${docKey}_img`;
                                                const label = docKey === 'layout' ? 'Layout' : docKey === 'wiring' ? 'Wiring' : 'Precheck';
                                                return (
                                                    <div key={docKey} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                        <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                                                            {modal.data[dbKey] || (document.getElementById(`${docKey}_img_input`) && document.getElementById(`${docKey}_img_input`).value) ? (
                                                                <img src={modal.data[dbKey] || document.getElementById(`${docKey}_img_input`).value} alt={label} className="w-full h-full object-cover" />
                                                            ) : <Icons.Image />}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-[10px] font-bold text-slate-700">{label}</div>
                                                            <div className="text-[9px] text-slate-400 truncate">{modal.data[dbKey] ? 'อัปโหลดแล้ว' : 'ยังไม่มีไฟล์'}</div>
                                                        </div>
                                                        <input type="hidden" name={dbKey} id={`${dbKey}_input`} defaultValue={modal.data[dbKey] || ''} />
                                                        <input type="file" accept="image/*" className="hidden" id={`${docKey}_file_input`} onChange={(e) => handleImageUpload(e, docKey)} />
                                                        <button type="button" onClick={() => document.getElementById(`${docKey}_file_input`).click()} disabled={uploadingDoc[docKey]} className="px-3 py-1.5 bg-slate-100 text-slate-600 font-bold rounded shadow-sm text-[10px] active:scale-95 flex items-center gap-1 border border-slate-300 disabled:opacity-50">
                                                            {uploadingDoc[docKey] ? '⏳' : <><Icons.Upload /> อัปโหลด</>}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                            <p className="text-[9px] text-red-500 leading-tight">* รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG) ระบบจะทำการบีบอัดให้อัตโนมัติเพื่อความรวดเร็ว</p>
                                        </div>

                                        {isAdmin && (
                                            <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                                                <label className="text-xs font-bold text-green-800 mb-2 block border-b border-green-200 pb-1">จัดการสถานะเอกสาร (เฉพาะแอดมิน)</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    <label className="flex items-center gap-1.5 text-xs bg-white p-2 rounded-lg border border-green-100 cursor-pointer">
                                                        <input type="checkbox" name="layout_doc" defaultChecked={String(modal.data.layout_doc) === 'true'} className="w-3.5 h-3.5" /> <span className="truncate">Layout</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 text-xs bg-white p-2 rounded-lg border border-green-100 cursor-pointer">
                                                        <input type="checkbox" name="wiring_doc" defaultChecked={String(modal.data.wiring_doc) === 'true'} className="w-3.5 h-3.5" /> <span className="truncate">Wiring</span>
                                                    </label>
                                                    <label className="flex items-center gap-1.5 text-xs bg-white p-2 rounded-lg border border-green-100 cursor-pointer">
                                                        <input type="checkbox" name="precheck_doc" defaultChecked={String(modal.data.precheck_doc) === 'true'} className="w-3.5 h-3.5" /> <span className="truncate">Precheck</span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        {isAdmin && !modal.data.id && (
                                            <label className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 p-3 rounded-xl border border-blue-200 cursor-pointer mt-2">
                                                <input type="checkbox" name="keep_open" className="w-4 h-4 accent-blue-600" />
                                                บันทึกแล้วเปิดหน้านี้ค้างไว้ (สำหรับลงคิวหลายรายการ)
                                            </label>
                                        )}
                                    </div>
                                ) : quickAddType === 'leave' ? (
                                    <div className="space-y-4">
                                        <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200 space-y-3">
                                            <div>
                                                <label className="text-xs font-bold text-yellow-800 mb-1 block">ประเภทการลา</label>
                                                <select name="leave_type" className="w-full text-sm p-2 rounded-lg border border-yellow-300 outline-none bg-white" value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                                                    <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option><option value="อื่นๆโปรดระบุ">อื่นๆ (โปรดระบุ)</option>
                                                </select>
                                                {leaveType === 'อื่นๆโปรดระบุ' && <input type="text" name="custom_leave" className="w-full text-sm p-2 rounded-lg border border-yellow-300 outline-none bg-white mt-2" placeholder="ระบุประเภทการลา..." required />}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-yellow-800 mb-1 block">ผู้ตรวจที่ต้องการลางาน</label>
                                                <select name="inspector_name_leave" className="w-full text-sm p-2 rounded-lg border border-yellow-300 outline-none bg-white" value={leaveInspector} onChange={e => setLeaveInspector(e.target.value)} required>
                                                    <option value="" disabled>-- เลือกผู้ตรวจ --</option>
                                                    {(db.inspectors || []).map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div><label className="text-[10px] font-bold text-yellow-700 block">ตั้งแต่วันที่</label><input type="date" className="w-full text-sm p-2 rounded border border-yellow-300 bg-white" value={leaveStartDate} onChange={e => { setLeaveStartDate(e.target.value); if(!leaveEndDate || e.target.value > leaveEndDate) setLeaveEndDate(e.target.value); }} required /></div>
                                                <div><label className="text-[10px] font-bold text-yellow-700 block">ถึงวันที่</label><input type="date" className="w-full text-sm p-2 rounded border border-yellow-300 bg-white" value={leaveEndDate} onChange={e => setLeaveEndDate(e.target.value)} min={leaveStartDate} required /></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-yellow-200">
                                                <div><label className="text-[10px] font-bold text-yellow-700 block">เวลาเริ่ม (ถ้าไม่เต็มวัน)</label><input type="time" name="start_time" className="w-full text-sm p-2 rounded border border-yellow-300 bg-white" value={leaveStartTime} onChange={e => setLeaveStartTime(e.target.value)} /></div>
                                                <div><label className="text-[10px] font-bold text-yellow-700 block">เวลาสิ้นสุด</label><input type="time" name="end_time" className="w-full text-sm p-2 rounded border border-yellow-300 bg-white" value={leaveEndTime} onChange={e => setLeaveEndTime(e.target.value)} /></div>
                                            </div>
                                            {leaveMins > 0 && <div className="text-[10px] text-yellow-600 text-right mt-1 font-bold">รวมเวลา: {formatDuration(leaveMins)}</div>}
                                            <div className="text-[10px] text-yellow-600 bg-yellow-100 p-2 rounded border border-yellow-200 text-center font-bold">สรุป: จำนวน {leaveDates.length} วันทำการ (ข้ามวันอาทิตย์และวันหยุด)</div>
                                        </div>
                                    </div>
                                ) : quickAddType === 'event' ? (
                                    <div className="space-y-4">
                                        <div className="bg-green-50 p-3 rounded-xl border border-green-200 space-y-3 relative">
                                            <div><label className="text-xs font-bold text-green-800 mb-1 block">หัวข้อกิจกรรม</label><input type="text" name="site_name" className="w-full text-sm p-2 rounded-lg border border-green-300 outline-none bg-white" placeholder="เช่น อบรมความปลอดภัย, ประชุมประจำเดือน..." required /></div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div><label className="text-[10px] font-bold text-green-700 block">ตั้งแต่วันที่</label><input type="date" className="w-full text-sm p-2 rounded border border-green-300 bg-white" value={eventStartDate} onChange={e => { setEventStartDate(e.target.value); if(!eventEndDate || e.target.value > eventEndDate) setEventEndDate(e.target.value); }} required /></div>
                                                <div><label className="text-[10px] font-bold text-green-700 block">ถึงวันที่</label><input type="date" className="w-full text-sm p-2 rounded border border-green-300 bg-white" value={eventEndDate} onChange={e => setEventEndDate(e.target.value)} min={eventStartDate} required /></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-green-200">
                                                <div><label className="text-[10px] font-bold text-green-700 block">เวลาเริ่ม (ถ้ามี)</label><input type="time" name="start_time" className="w-full text-sm p-2 rounded border border-green-300 bg-white" value={eventStartTime} onChange={e => setEventStartTime(e.target.value)} /></div>
                                                <div><label className="text-[10px] font-bold text-green-700 block">เวลาสิ้นสุด</label><input type="time" name="end_time" className="w-full text-sm p-2 rounded border border-green-300 bg-white" value={eventEndTime} onChange={e => setEventEndTime(e.target.value)} /></div>
                                            </div>
                                            {eventMins > 0 && <div className="text-[10px] text-green-600 text-right mt-1 font-bold">ระยะเวลา: {formatDuration(eventMins)}</div>}
                                            
                                            <div className="mt-2 pt-2 border-t border-green-200 relative">
                                                <label className="text-[10px] font-bold text-green-800 mb-1 block">ผู้เข้าร่วมกิจกรรม</label>
                                                <div 
                                                    className="w-full text-sm p-2 rounded-lg border border-green-300 bg-white min-h-[38px] flex flex-wrap gap-1 items-center cursor-pointer"
                                                    onClick={(e) => { e.stopPropagation(); setShowParticipantDropdown(!showParticipantDropdown); }}
                                                >
                                                    {eventParticipants.length === 0 && eventInspector !== 'ALL' ? (
                                                        <span className="text-slate-400">คลิกเพื่อเลือกผู้เข้าร่วม...</span>
                                                    ) : eventInspector === 'ALL' ? (
                                                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">พนักงานทุกคน (SYSTEM_EVENT)</span>
                                                    ) : (
                                                        eventParticipants.map(p => (
                                                            <span key={p} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center gap-1 font-bold">
                                                                {p} <button type="button" onClick={(e) => { e.stopPropagation(); setEventParticipants(prev => prev.filter(x => x !== p)); }} className="text-green-600 hover:text-green-800">×</button>
                                                            </span>
                                                        ))
                                                    )}
                                                </div>
                                                
                                                {showParticipantDropdown && (
                                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-lg shadow-xl z-50 max-h-48 overflow-y-auto">
                                                        <div 
                                                            className={`p-2 text-sm cursor-pointer hover:bg-green-50 border-b font-bold ${eventInspector === 'ALL' ? 'bg-green-100 text-green-800' : ''}`}
                                                            onClick={(e) => { e.stopPropagation(); setEventInspector('ALL'); setEventParticipants([]); setShowParticipantDropdown(false); }}
                                                        >
                                                            ⭐ เลือกทุกคน (เป็นกิจกรรมส่วนรวม)
                                                        </div>
                                                        <div className="p-1.5 text-[10px] font-bold text-slate-500 bg-slate-50">เลือกเฉพาะบุคคล</div>
                                                        {(db.inspectors || []).map(i => (
                                                            <div 
                                                                key={i.id} 
                                                                className="p-2 text-sm cursor-pointer hover:bg-green-50 flex items-center gap-2"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (eventInspector === 'ALL') setEventInspector('SPECIFIC');
                                                                    setEventParticipants(prev => prev.includes(i.name) ? prev.filter(x => x !== i.name) : [...prev, i.name]);
                                                                }}
                                                            >
                                                                <input type="checkbox" checked={eventParticipants.includes(i.name)} readOnly className="pointer-events-none" />
                                                                {i.name}
                                                            </div>
                                                        ))}
                                                        <div className="p-2 border-t text-center">
                                                            <button type="button" className="text-xs bg-green-600 text-white px-4 py-1.5 rounded font-bold" onClick={(e) => { e.stopPropagation(); setShowParticipantDropdown(false); }}>ตกลง</button>
                                                        </div>
                                                    </div>
                                                )}
                                                <input type="hidden" name="inspector_name_event" value={eventInspector === 'ALL' ? 'SYSTEM_EVENT' : eventParticipants.join(',')} />
                                            </div>

                                            <div className="text-[10px] text-green-600 bg-green-100 p-2 rounded border border-green-200 text-center font-bold">สรุป: จำนวน {eventDates.length} วันทำการ (ข้ามวันอาทิตย์และวันหยุด)</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="bg-red-50 p-3 rounded-xl border border-red-200 space-y-3">
                                            <div><label className="text-xs font-bold text-red-800 mb-1 block">ชื่อวันหยุด</label><input type="text" name="site_name" className="w-full text-sm p-2 rounded-lg border border-red-300 outline-none bg-white" placeholder="เช่น วันปีใหม่, วันสงกรานต์..." required /></div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div><label className="text-[10px] font-bold text-red-700 block">ตั้งแต่วันที่</label><input type="date" className="w-full text-sm p-2 rounded border border-red-300 bg-white" value={holidayStartDate} onChange={e => { setHolidayStartDate(e.target.value); if(!holidayEndDate || e.target.value > holidayEndDate) setHolidayEndDate(e.target.value); }} required /></div>
                                                <div><label className="text-[10px] font-bold text-red-700 block">ถึงวันที่</label><input type="date" className="w-full text-sm p-2 rounded border border-red-300 bg-white" value={holidayEndDate} onChange={e => setHolidayEndDate(e.target.value)} min={holidayStartDate} required /></div>
                                            </div>
                                            <div className="text-[10px] text-red-600 bg-red-100 p-2 rounded border border-red-200 text-center font-bold">สรุป: จำนวน {holidayDates.length} วัน (รวมเสาร์-อาทิตย์)</div>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-2">
                                    {quickAddType === 'job' ? (
                                        <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-black rounded-xl shadow-lg active:scale-95 text-base flex justify-center items-center gap-2">
                                            <Icons.Check /> {modal.data.id ? 'บันทึกการแก้ไข' : 'ยืนยันจองคิว'}
                                        </button>
                                    ) : (
                                        <button 
                                            type="button" 
                                            className={`w-full py-3.5 text-white font-black rounded-xl shadow-lg active:scale-95 text-base flex justify-center items-center gap-2 ${quickAddType === 'leave' ? 'bg-yellow-500' : quickAddType === 'event' ? 'bg-green-600' : 'bg-red-600'}`}
                                            onClick={async () => {
                                                const form = document.querySelector('form');
                                                if (form.reportValidity()) {
                                                    if (quickAddType === 'leave' && (!leaveStartDate || !leaveEndDate || !leaveInspector)) return setAlertMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
                                                    if (quickAddType === 'event' && (!eventStartDate || !eventEndDate || (eventInspector !== 'ALL' && eventParticipants.length === 0))) return setAlertMsg('กรุณากรอกข้อมูลและเลือกผู้เข้าร่วมให้ครบถ้วน');
                                                    if (quickAddType === 'holiday' && (!holidayStartDate || !holidayEndDate)) return setAlertMsg('กรุณากรอกวันที่ให้ครบถ้วน');

                                                    let datesToProcess = quickAddType === 'leave' ? leaveDates : quickAddType === 'event' ? eventDates : holidayDates;
                                                    if (datesToProcess.length === 0) return setAlertMsg('ช่วงวันที่เลือกไม่มีวันทำการ');

                                                    setLoadingMsg(`กำลังบันทึกข้อมูล ${datesToProcess.length} วัน...`);
                                                    const fd = new FormData(form);
                                                    
                                                    let p_jobType = '', p_siteName = fd.get('site_name'), p_eqPrefix = '', inspectorsToProcess = [];
                                                    const sTime = fd.get('start_time'); const eTime = fd.get('end_time');
                                                    
                                                    if (quickAddType === 'leave') {
                                                        p_jobType = 'leave'; p_eqPrefix = 'LEAVE_'; inspectorsToProcess = [leaveInspector];
                                                        if (leaveType === 'อื่นๆโปรดระบุ') p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('custom_leave');
                                                        else p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + leaveType;
                                                    } else if (quickAddType === 'event') {
                                                        p_jobType = 'company_event'; p_eqPrefix = 'EVENT_';
                                                        if (sTime && eTime) p_siteName = `${sTime}-${eTime} ${p_siteName}`;
                                                        inspectorsToProcess = eventInspector === 'ALL' ? ['SYSTEM_EVENT'] : eventParticipants;
                                                    } else if (quickAddType === 'holiday') {
                                                        p_jobType = 'public_holiday'; p_eqPrefix = 'HLD_'; inspectorsToProcess = ['SYSTEM_HOLIDAY'];
                                                    }

                                                    let allSuccess = true;
                                                    const baseEqTs = Date.now();
                                                    
                                                    for (let idx = 0; idx < inspectorsToProcess.length; idx++) {
                                                        const currentIns = inspectorsToProcess[idx];
                                                        const p_eq = `${p_eqPrefix}${baseEqTs}_${idx}`;
                                                        const logDetail = `[บันทึก${quickAddType}แบบกลุ่ม]\nโดย: ${user?.username}\nจำนวน: ${datesToProcess.length} วัน\nหัวข้อ: ${p_siteName}\nผู้ตรวจ: ${currentIns}`;
                                                        
                                                        const payload = { action: 'create_multiple_bookings', dates: datesToProcess, inspector_name: currentIns, job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, user: user.username, reason: logDetail };
                                                        try {
                                                            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
                                                            const result = await res.json();
                                                            if (result.status !== 'ok') allSuccess = false;
                                                        } catch (e) { allSuccess = false; }
                                                    }

                                                    setLoadingMsg(null);
                                                    if (allSuccess) { 
                                                        await fetchCoreData(true, null); 
                                                        setModal(null); setSuccessModal(`บันทึกสำเร็จ`); 
                                                        setLeaveStartDate(''); setLeaveEndDate(''); setEventStartDate(''); setEventEndDate(''); setHolidayStartDate(''); setHolidayEndDate(''); setEventParticipants([]); setEventInspector('ALL');
                                                    } else { setAlertMsg('เกิดข้อผิดพลาดในการบันทึกบางรายการ'); }
                                                }
                                            }}
                                        >
                                            <Icons.Check /> ยืนยันบันทึกข้อมูล
                                        </button>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {alertMsg && (
                <div className="backdrop z-[600]">
                    <div className="bg-white w-[85%] max-w-sm rounded-2xl p-6 shadow-2xl animate-pop border-l-4 border-red-500">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0"><Icons.Alert /></div>
                            <div><h3 className="text-sm font-bold text-slate-800 mb-1">แจ้งเตือน</h3><p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{alertMsg}</p></div>
                        </div>
                        <div className="mt-5 text-right"><button className="px-5 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs active:scale-95" onClick={() => setAlertMsg(null)}>ปิดหน้าต่าง</button></div>
                    </div>
                </div>
            )}

            {confirmDialog && (
                <div className="backdrop z-[600]">
                    <div className="bg-white w-[85%] max-w-sm rounded-2xl p-6 shadow-2xl animate-pop text-center">
                        <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Alert /></div>
                        <h3 className="text-base font-bold text-slate-800 mb-2">ยืนยันการทำรายการ</h3>
                        <div className="text-sm text-slate-600 mb-6 whitespace-pre-wrap">{confirmDialog.msg}</div>
                        <div className="flex gap-3">
                            <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl active:scale-95" onClick={() => setConfirmDialog(null)}>ยกเลิก</button>
                            <button className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95" onClick={confirmDialog.onConfirm}>ยืนยันตกลง</button>
                        </div>
                    </div>
                </div>
            )}

            {promptDialog && (
                <div className="backdrop z-[600]">
                    <div className="bg-white w-[85%] max-w-sm rounded-2xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-base font-bold text-slate-800 mb-3 text-center">{promptDialog.msg}</h3>
                        <input type="text" id="prompt-input" className="w-full border p-3 rounded-xl mb-4 text-sm outline-none focus:border-blue-500 bg-slate-50" placeholder="ระบุเหตุผล..." autoFocus />
                        <div className="flex gap-3">
                            <button className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl active:scale-95" onClick={() => setPromptDialog(null)}>ยกเลิก</button>
                            <button className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95" onClick={() => {
                                const val = document.getElementById('prompt-input').value;
                                if(!val.trim()) return setAlertMsg('กรุณาระบุเหตุผล');
                                promptDialog.onSubmit(val);
                                setPromptDialog(null);
                            }}>ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {showLogin && (
                <div className="backdrop z-[500] backdrop-blur-md">
                    <div className="bg-white w-[90%] max-w-md rounded-3xl p-6 shadow-2xl animate-slide-up relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-blue-500"></div>
                        <button className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1" onClick={() => { setShowLogin(false); setIsRegisterMode(false); setIsForgotMode(false); }}><Icons.X /></button>
                        
                        <div className="text-center mb-6 mt-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
                                <Icons.User />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800">{isForgotMode ? 'กู้คืนรหัสผ่าน' : isRegisterMode ? 'สร้างบัญชีใหม่' : 'เข้าสู่ระบบ'}</h2>
                            <p className="text-xs text-slate-500 mt-1">{isForgotMode ? 'ติดต่อ Admin เพื่อขอรหัสผ่านใหม่' : isRegisterMode ? 'กรอกข้อมูลเพื่อลงทะเบียนเข้าใช้งาน' : 'กรอกข้อมูลเพื่อเข้าสู่ระบบลงคิวงาน SAIS'}</p>
                        </div>

                        {isForgotMode ? (
                            <div className="text-center space-y-4">
                                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-4">
                                    <Icons.Alert />
                                    <p className="text-sm font-bold text-amber-800 mt-2">หากลืมรหัสผ่าน กรุณาติดต่อ Admin</p>
                                    <p className="text-xs text-amber-700 mt-1">เพื่อให้ Admin ทำการรีเซ็ตรหัสผ่านให้ใหม่ผ่านระบบจัดการ</p>
                                </div>
                                <button className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl active:scale-95" onClick={() => setIsForgotMode(false)}>กลับไปหน้าเข้าสู่ระบบ</button>
                            </div>
                        ) : (
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const fd = new FormData(e.target);
                                const u = fd.get('username'); const p = fd.get('password'); const f = fd.get('full_name');
                                
                                if (isRegisterMode) {
                                    if (!u || !p || !f) return setAlertMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
                                    if (p.length < 4) return setAlertMsg('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร');
                                    setLoadingMsg('กำลังลงทะเบียน...');
                                    try {
                                        const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'register', username: u, password: p, full_name: f }) });
                                        const result = await res.json();
                                        setLoadingMsg(null);
                                        if (result.status === 'ok') { setSuccessModal('ลงทะเบียนสำเร็จ! เข้าสู่ระบบได้เลย'); setIsRegisterMode(false); } 
                                        else { setAlertMsg(result.message || 'ลงทะเบียนไม่สำเร็จ (ชื่อผู้ใช้อาจซ้ำ)'); }
                                    } catch (err) { setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                                } else {
                                    if (!u || !p) return setAlertMsg('กรุณากรอก Username และ Password');
                                    setLoadingMsg('กำลังตรวจสอบข้อมูล...');
                                    try {
                                        const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'login', username: u, password: p }) });
                                        const result = await res.json();
                                        setLoadingMsg(null);
                                        if (result.status === 'ok') {
                                            const userData = result.user;
                                            setUser(userData); localStorage.setItem('sais_user', JSON.stringify(userData)); localStorage.setItem('sais_session_time', Date.now().toString());
                                            setShowLogin(false); setSuccessModal('เข้าสู่ระบบสำเร็จ');
                                            if (userData.role === 'admin') fetchAdminData();
                                        } else { setAlertMsg('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'); }
                                    } catch (err) { setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                                }
                            }} className="space-y-4">
                                {isRegisterMode && (
                                    <div><label className="text-xs font-bold text-slate-700 mb-1 block pl-1">ชื่อ-นามสกุล / แผนก</label><input type="text" name="full_name" className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors" placeholder="ระบุชื่อจริง หรือชื่อเล่น+แผนก" required /></div>
                                )}
                                <div><label className="text-xs font-bold text-slate-700 mb-1 block pl-1">ชื่อผู้ใช้ (Username)</label><input type="text" name="username" className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors" placeholder="กรอกชื่อผู้ใช้ภาษาอังกฤษ" required /></div>
                                <div>
                                    <div className="flex justify-between mb-1 pl-1 pr-1">
                                        <label className="text-xs font-bold text-slate-700">รหัสผ่าน (Password)</label>
                                        {!isRegisterMode && <button type="button" className="text-[10px] text-blue-600 font-bold hover:underline" onClick={() => setIsForgotMode(true)}>ลืมรหัสผ่าน?</button>}
                                    </div>
                                    <div className="relative">
                                        <input type={showPassword ? "text" : "password"} name="password" className="w-full p-3 rounded-xl border border-slate-300 outline-none focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors pr-10" placeholder="กรอกรหัสผ่าน" required />
                                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-200 transition-all active:scale-95 text-base mt-2">
                                    {isRegisterMode ? 'ยืนยันสร้างบัญชี' : 'เข้าสู่ระบบ'}
                                </button>
                                <div className="text-center pt-2">
                                    <button type="button" className="text-xs text-slate-500 hover:text-slate-800 font-bold" onClick={() => setIsRegisterMode(!isRegisterMode)}>
                                        {isRegisterMode ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบที่นี่' : 'ยังไม่มีบัญชี? สมัครสมาชิกใหม่'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {showActivityModal && (
                <div className="backdrop z-[500]" onClick={() => setShowActivityModal(false)}>
                    <div className="bg-[#f8fafc] w-full max-w-md h-[85vh] absolute bottom-0 rounded-t-3xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()} style={{ animation: 'slideUp 0.3s ease-out' }}>
                        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-3"></div>
                        <div className="flex px-4 gap-2 mb-2 border-b border-slate-200 pb-2">
                            <button className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 ${activityTab === 'notif' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`} onClick={() => setActivityTab('notif')}>
                                <Icons.Bell /> การแจ้งเตือน {unreadNotifs.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{unreadNotifs.length}</span>}
                            </button>
                            {isAdmin && (
                                <button className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all flex justify-center items-center gap-2 ${activityTab === 'log' ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200'}`} onClick={() => setActivityTab('log')}>
                                    <Icons.FileText /> ประวัติล่าสุด
                                </button>
                            )}
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            {activityTab === 'notif' ? (
                                <div className="space-y-3">
                                    {(() => {
                                        const myNotifs = (db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 30);
                                        if (!user) return <div className="text-center text-slate-400 p-8">กรุณาเข้าสู่ระบบเพื่อดูการแจ้งเตือน</div>;
                                        if (myNotifs.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed rounded-xl">ไม่มีการแจ้งเตือนใหม่</div>;
                                        return myNotifs.map(n => {
                                            const isRead = String(n.isRead) === 'true';
                                            return (
                                                <div key={n.id} className={`p-4 rounded-xl shadow-sm border relative overflow-hidden transition-all ${isRead ? 'bg-white border-slate-200 opacity-70' : 'bg-blue-50/50 border-blue-200 cursor-pointer'}`} onClick={() => !isRead && markNotifAsRead(n.id)}>
                                                    {!isRead && <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>}
                                                    <div className="font-bold text-slate-800 text-sm mb-1">{n.title}</div>
                                                    <div className="text-xs text-slate-600 mb-2">{n.message}</div>
                                                    <div className="text-[9px] text-slate-400">{new Date(n.created_at).toLocaleString('th-TH')}</div>
                                                </div>
                                            );
                                        });
                                    })()}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {(!adminDb || !adminDb.logs) ? (
                                        <div className="text-center text-slate-400 p-8"><Icons.Loader /> กำลังโหลดประวัติ...</div>
                                    ) : (
                                        adminDb.logs.slice(0, 30).map((l, i) => (
                                            <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                                <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">{l.action}</span><span className="text-[10px] text-slate-400">{new Date(l.timestamp).toLocaleString('th-TH')}</span></div>
                                                <div className="text-[10px] text-slate-600 whitespace-pre-wrap">{l.details}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
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
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95">โหลดหน้าใหม่</button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
