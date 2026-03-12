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
            const dateStr = task.date ? String(task.date).split('T')[0] : null;
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
        ? `50px repeat(${numInspectors}, 250px)` 
        : `45px repeat(${numInspectors}, ${colWidthPx}px)`;

    return (
        <div id="calendar-export-area" className={`calendar-grid ${isExporting ? 'export-mode' : ''}`} style={{ 
            gridTemplateColumns: gridCols,
            width: 'max-content',
            minWidth: '100%',
            backgroundColor: isExporting ? '#cbd5e1' : undefined
        }}>
            <div className="sticky-corner font-bold flex items-center justify-center" style={{ fontSize: `${11 * tableFontScale}px` }}>DATE</div>
            {(db.inspectors || []).map((ins, i) => (
                <div key={i} className="sticky-top flex items-center justify-center">
                    <div className="font-bold truncate w-full text-center px-1" style={{ fontSize: `${13 * tableFontScale}px` }}>{ins.name || '-'}</div>
                </div>
            ))}
            {daysInView.map((d, index) => {
                let headerClass = '';
                if (d.isGlobalHoliday) headerClass = 'is-sunday-col';
                else if (d.isGlobalEvent) headerClass = 'is-global-event-col';

                return (
                    <React.Fragment key={index}>
                        <div className={`sticky-left ${headerClass} ${d.isToday ? 'is-today-row' : ''} flex flex-col justify-center items-center`}>
                            {!d.isEmpty && (
                                <>
                                    <span className="font-black" style={{ fontSize: `${15 * tableFontScale}px`, lineHeight: 1.1 }}>{d.day}</span>
                                    <span className="font-bold opacity-90" style={{ fontSize: `${10 * tableFontScale}px` }}>{d.weekday}</span>
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
                                    
                                    {/* 📍 คลิกที่ป้ายหยุดรวมหรือกิจกรรมรวมให้เด้งเมนูจัดการ (Action Menu) สำหรับแอดมิน */}
                                    {d.isGlobalHoliday && cellTasks.length === 0 && d.globalHolidays.map((gh, ghi) => (
                                        <div key={'gh'+ghi} className="holiday-label-new flex-1 flex items-center justify-center text-white text-center" style={{ fontSize: `${12 * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
                                            onClick={(e) => { e.stopPropagation(); isAdmin ? setModal({ type: 'task_action', data: gh }) : setModal({ type: 'detail', data: gh }); }}>
                                            {gh.site_name}
                                        </div>
                                    ))}

                                    {d.isGlobalEvent && !hasLeave && cellTasks.length === 0 && d.globalEvents.map((ge, gei) => (
                                        <div key={'ge'+gei} className="holiday-label-new flex-1 flex items-center justify-center text-white text-center" style={{ fontSize: `${12 * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }} 
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
                                                className={`task-content relative overflow-hidden w-full flex items-center justify-center p-1 rounded-md ${isSingleCard ? 'h-full min-h-[40px]' : 'flex-1 min-h-[26px] border-b border-white/25'}`}
                                                style={{ backgroundColor: styleObj.bg, color: styleObj.text }}
                                                onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    // 📍 ให้ Admin หรือเจ้าของงาน เด้งเข้าเมนูจัดการด่วน (Action Menu) แทน Detail ปกติ
                                                    if (isAdmin || user?.username === task.created_by) {
                                                        setModal({ type: 'task_action', data: task });
                                                    } else {
                                                        setModal({ type: 'detail', data: task });
                                                    }
                                                }}>
                                                
                                                {!styleObj.isSpecial && (
                                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${PRODUCT_COLORS[task.product_line] || 'bg-slate-400'}`}></div>
                                                )}
                                                
                                                <div className={`w-full flex flex-col justify-center items-center text-center`}>
                                                    {styleObj.isLeave ? (
                                                        <div className="font-black flex items-center justify-center leading-none" style={{ fontSize: `${(isSingleCard ? 36 : 24) * specialFontScale}px` }}>
                                                            ลา
                                                        </div>
                                                    ) : isSingleCard ? (
                                                        <div className="format-multi-line flex flex-col justify-center items-center w-full !text-center">
                                                            {!styleObj.isSpecial ? (
                                                                <>
                                                                    <div className="leading-tight opacity-90 font-bold" style={{ fontSize: `${10 * dynamicScale * tableFontScale}px` }}>{task.equipment_no} <span className="opacity-60">/</span> {task.unit_no}</div>
                                                                    <div className={`leading-tight font-black mt-[2px] w-full break-words`} style={{ fontSize: `${11 * dynamicScale * tableFontScale}px`, whiteSpace: isExporting ? 'normal' : 'inherit' }}>{task.site_name}</div>
                                                                </>
                                                            ) : (
                                                                <div className={`whitespace-pre-wrap leading-tight font-black w-full break-words`} style={{ fontSize: `${12 * dynamicScale * specialFontScale}px`, whiteSpace: isExporting ? 'normal' : 'pre-wrap' }}>{task.site_name}</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className={`format-single-line font-black leading-tight w-full !text-center`} style={{ fontSize: `${10 * dynamicScale * (styleObj.isSpecial ? specialFontScale : tableFontScale)}px`, whiteSpace: isExporting ? 'normal' : 'nowrap', overflow: isExporting ? 'visible' : 'hidden' }}>
                                                            {!styleObj.isSpecial ? `${task.equipment_no} ${task.site_name}` : task.site_name}
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
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [adminBookingsLimit, setAdminBookingsLimit] = useState(20);
    const [myBookingsTab, setMyBookingsTab] = useState('pending');
    const [myBookingsLimit, setMyBookingsLimit] = useState(20);
    const [actionMenuId, setActionMenuId] = useState(null); 
    const [logsLimit, setLogsLimit] = useState(20);
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

    // 📍 FIX: ตัวแปร State ที่หายไป
    const [showParticipantDropdown, setShowParticipantDropdown] = useState(false);
    const [eventParticipants, setEventParticipants] = useState([]);

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

    // 📍 FIX: คำนวณเวลาที่หายไป
    const leaveMins = calculateTimeDuration(leaveStartTime, leaveEndTime) || 0;
    const eventMins = calculateTimeDuration(eventStartTime, eventEndTime) || 0;

    useEffect(() => {
        if (successModal) {
            const timer = setTimeout(() => {
                setSuccessModal(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successModal]);

    useEffect(() => { localStorage.setItem('sais_table_font_scale', tableFontScale.toString()); }, [tableFontScale]);
    useEffect(() => { localStorage.setItem('sais_special_font_scale', specialFontScale.toString()); }, [specialFontScale]);
    useEffect(() => { localStorage.setItem('sais_column_zoom', columnZoom.toString()); }, [columnZoom]);

    const updateTableFontScale = (adjustment) => {
        setTableFontScale(prev => { const newVal = Math.max(0.3, Math.min(5.0, prev + adjustment)); return Math.round(newVal * 10) / 10; });
    };

    const updateSpecialFontScale = (adjustment) => {
        setSpecialFontScale(prev => { const newVal = Math.max(0.3, Math.min(5.0, prev + adjustment)); return Math.round(newVal * 10) / 10; });
    };

    const updateColumnZoom = (adjustment) => {
        setColumnZoom(prev => { const newVal = Math.max(0.3, Math.min(3.0, prev + adjustment)); return Math.round(newVal * 10) / 10; });
    };

    const [isNavVisible, setIsNavVisible] = useState(true);
    useEffect(() => {
        let navTimer;
        const handleUserActivity = () => {
            setIsNavVisible(true);
            clearTimeout(navTimer);
            navTimer = setTimeout(() => setIsNavVisible(false), 3500); 
        };
        
        window.addEventListener('touchstart', handleUserActivity);
        window.addEventListener('click', handleUserActivity);
        window.addEventListener('scroll', handleUserActivity, true);
        window.addEventListener('mousemove', handleUserActivity);
        
        handleUserActivity(); 
        
        return () => {
            window.removeEventListener('touchstart', handleUserActivity);
            window.removeEventListener('click', handleUserActivity);
            window.removeEventListener('scroll', handleUserActivity, true);
            window.removeEventListener('mousemove', handleUserActivity);
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
        if (utils && typeof utils.getMapEmbedUrl === 'function') {
            setLiveMapUrl(utils.getMapEmbedUrl(val) || '');
        } else { setLiveMapUrl(''); }
    };

    const handleEventParticipantChange = (e) => {
        const val = e.target.value;
        const checked = e.target.checked;
        if (val === 'ALL') {
            setEventParticipants(checked ? ['ALL'] : []);
        } else {
            let newArr = [...eventParticipants].filter(p => p !== 'ALL');
            if (checked) newArr.push(val); else newArr = newArr.filter(p => p !== val);
            setEventParticipants(newArr);
        }
    };

    const handleBulkDelete = async (type, ids) => {
        if (ids.length === 0) return;
        setConfirmDialog({
            msg: `ยืนยันลบข้อมูลที่เลือกทั้ง ${ids.length} รายการ?`,
            onConfirm: async () => {
                setConfirmDialog(null);
                setLoadingMsg('กำลังลบข้อมูลแบบกลุ่ม...');
                try {
                    const res = await utils.fetchWithRetry(SCRIPT_URL, { 
                        method: 'POST', 
                        body: JSON.stringify({ action: 'delete_multiple', ids: ids, user: user.username }) 
                    });
                    if (res.status === 'ok') {
                        if (type === 'leave') setSelectedLeavesToDelete([]);
                        if (type === 'event') setSelectedEventsToDelete([]);
                        if (type === 'holiday') setSelectedHolidaysToDelete([]);
                        await fetchCoreData(true, null); 
                        setSuccessModal(`ลบสำเร็จ ${res.deleted} รายการ`);
                    } else {
                        setAlertMsg('เกิดข้อผิดพลาดในการลบ');
                    }
                } catch(e) { setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                setLoadingMsg(null);
            }
        });
    };

    const generateDates = (startStr, endStr, omitSunday = true) => {
        if (!startStr || !endStr) return [];
        let start = new Date(`${startStr}T12:00:00`); 
        let end = new Date(`${endStr}T12:00:00`);
        if (start > end) return [];
        let dates = [];
        let current = new Date(start);
        while (current <= end) {
            const localDateStr = utils.getLocalDateString ? utils.getLocalDateString(current) : current.toISOString().split('T')[0];
            const isSunday = current.getDay() === 0;
            const isGlobalHoliday = (db.bookings || []).some(b => b.date && String(b.date).split('T')[0] === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY');
            if (!omitSunday || (!isSunday && !isGlobalHoliday)) dates.push(localDateStr);
            current.setDate(current.getDate() + 1);
        } return dates;
    };

    const leaveDates = useMemo(() => generateDates(leaveStartDate, leaveEndDate, true), [leaveStartDate, leaveEndDate, db.bookings]);
    const eventDates = useMemo(() => generateDates(eventStartDate, eventEndDate, true), [eventStartDate, eventEndDate, db.bookings]);
    const holidayDates = useMemo(() => generateDates(holidayStartDate, holidayEndDate, false), [holidayStartDate, holidayEndDate]);

    const isAdmin = useMemo(() => user?.username === ADMIN_USERNAME || user?.role === 'admin', [user]);
    const unreadNotifs = useMemo(() => (db.notifications || []).filter(n => (n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')) && String(n.isRead) !== 'true'), [db.notifications, user, isAdmin]);

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
            if (result.status === 'ok') {
                setAdminDb(result.data);
                setHasLoadedAdmin(true);
            }
        } catch (e) { console.error("Admin Fetch Error"); }
    };

    const handleTabChange = (view) => {
        setCurrentView(view);
        if ((view === 'admin' || view === 'search') && !hasLoadedAdmin) {
            setLoadingMsg('กำลังดึงข้อมูลทั้งหมด...');
            fetchAdminData().then(() => setLoadingMsg(null));
        }
    };

    const apiAction = async (payload, customLoadMsg = 'กำลังบันทึกข้อมูล...') => {
        if (!SCRIPT_URL) return false;
        setLoadingMsg(customLoadMsg);
        try {
            const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
            const text = await res.text(); 
            try {
                const result = JSON.parse(text);
                setLoadingMsg(null);
                if (result.status === 'ok') { 
                    await fetchCoreData(true, null);
                    if(hasLoadedAdmin) await fetchAdminData();
                    return true; 
                } 
                else { setAlertMsg(result.message || 'ไม่ทราบสาเหตุ'); return false; }
            } catch(e) {
                setLoadingMsg(null);
                setAlertMsg('ข้อผิดพลาดจากเซิร์ฟเวอร์ กรุณาลองใหม่'); return false;
            }
        } catch (e) { 
            setLoadingMsg(null);
            setAlertMsg('การเชื่อมต่อเครือข่ายขัดข้อง'); return false; 
        }
    };

    const handleTouchStart = (e) => {
        if (scrollRef.current && scrollRef.current.scrollTop === 0) {
            touchStartY.current = e.touches[0].clientY;
        }
    };
    
    const handleTouchMove = (e) => {
        if (scrollRef.current && scrollRef.current.scrollTop === 0 && touchStartY.current > 0) {
            const y = e.touches[0].clientY;
            const diff = y - touchStartY.current;
            if (diff > 0 && diff < 80) setPullY(diff);
        }
    };

    const handleTouchEnd = async () => {
        if (pullY > 50 && !isRefreshing) {
            setIsRefreshing(true);
            setPullY(50); 
            await fetchCoreData(false, dbRef.current); 
            setIsRefreshing(false);
        }
        setPullY(0); 
        touchStartY.current = 0;
    };

    const handleCancelBooking = (booking) => {
        if(!booking?.id) return;
        setConfirmDialog({
            msg: "ยืนยันลบข้อมูลนี้ใช่หรือไม่?",
            onConfirm: async () => {
                setConfirmDialog(null);
                const logDetail = `ลบรายการ: ${booking.site_name || booking.equipment_no}`;
                const ok = await apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail }, 'กำลังลบ...');
                if(ok) {
                    setSuccessModal('ลบสำเร็จ');
                    setModal(null);
                }
            }
        });
    };

    const handleCancelJob = (booking) => {
        if(!booking?.id) return;
        const isPastDate = booking.date && String(booking.date).split('T')[0] < todayLocalString;
        if (isPastDate && !isAdmin) {
            return setAlertMsg('🔒 ไม่อนุญาตให้ยกเลิกคิวงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        }

        setPromptDialog({
            msg: "โปรดระบุเหตุผลในการยกเลิกคิวงานนี้:",
            onSubmit: (reason) => {
                const logDetail = `ยกเลิกงาน ${booking.site_name} เหตุผล: ${reason || 'ไม่ระบุ'}`;
                apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: logDetail }, 'กำลังยกเลิกคิวงาน...').then(ok => {
                    if(ok) { setModal(null); setActionMenuId(null); setSuccessModal('ยกเลิกคิวสำเร็จ'); }
                });
            }
        });
    };

    const handleToggleDoc = async (bookingId, docType, currentValue) => {
        const newValue = String(currentValue) === 'true' ? 'false' : 'true';
        setDb(prev => ({
            ...prev,
            bookings: prev.bookings.map(b => b.id === bookingId ? { ...b, [docType]: newValue } : b)
        }));
        await utils.fetchWithRetry(SCRIPT_URL, { 
            method: 'POST', 
            body: JSON.stringify({ action: 'update_booking', id: bookingId, user: user.username, [docType]: newValue }) 
        });
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
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true }));
        setLoadingMsg('กำลังบีบอัดและอัปโหลดรูปภาพ...');
        try {
            const base64Img = await utils.compressImage(file);
            const res = await utils.fetchWithRetry(SCRIPT_URL, {
                method: 'POST', body: JSON.stringify({ action: 'upload_image', base64: base64Img, mimeType: file.type, fileName: `SAIS_${docType}_${Date.now()}.jpg` })
            });
            if (res.status === 'ok') {
                document.getElementById(`${docType}_img_input`).value = res.fileUrl;
                setSuccessModal(`อัปโหลดเอกสาร ${docType} สำเร็จ`);
            } else { setAlertMsg('อัปโหลดไม่สำเร็จ'); }
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
        const isDup = db.bookings.some(b => String(b.date).split('T')[0] === targetDate && String(b.equipment_no) === String(task.equipment_no) && b.id !== taskId);
        if(isDup) return setAlertMsg('Eq No. นี้ถูกจองไปแล้วในวันเดียวกัน');

        setConfirmDialog({
            msg: `ย้ายคิว Eq: ${task.equipment_no} ไปยัง ${targetInspector} วันที่ ${targetDate}?`,
            onConfirm: async () => {
                setConfirmDialog(null);
                const ok = await apiAction({ action: 'update_booking', id: taskId, date: targetDate, inspector_name: targetInspector, user: user.username }, 'กำลังย้ายคิวงาน...');
                if(ok) setSuccessModal('ย้ายคิวสำเร็จ');
            }
        });
    };

    const filteredBookings = useMemo(() => {
        return (db.bookings || []).filter(b => {
            if (filterArea === 'All') return true;
            return String(b.area || '') === filterArea;
        });
    }, [db.bookings, filterArea]);

    const daysInView = useMemo(() => {
        if(!utils.getLocalDateString) return [];
        const year = currentDate.getFullYear(); const month = currentDate.getMonth(); const lastDay = new Date(year, month + 1, 0).getDate();
        const start = period === 0 ? 1 : 16; const end = period === 0 ? 15 : lastDay; const days = [];
        
        for (let i = 0; i < 16; i++) {
            const d = start + i;
            if (d <= end) {
                const date = new Date(year, month, d); const localDateStr = utils.getLocalDateString(date);
                const globalHolidayItems = (db.bookings || []).filter(b => b.date && String(b.date).split('T')[0] === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY' && String(b.status) !== 'cancelled');
                const globalEventItems = (db.bookings || []).filter(b => b.date && String(b.date).split('T')[0] === localDateStr && String(b.inspector_name) === 'SYSTEM_EVENT' && String(b.status) !== 'cancelled');
                
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

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target); const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : areaSelection;
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : productLineSelection;
        const isFromAdminPanel = modal?.data?.isAdminOverride === true;
        const targetInspector = isFromAdminPanel ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isFromAdminPanel ? fd.get('admin_date_target') : modal?.data?.date;

        const isPastDate = targetDate < todayLocalString;
        if (isPastDate && !isAdmin && modal?.data?.id) {
            return setAlertMsg('🔒 ไม่อนุญาตให้แก้ไขข้อมูลงานที่ผ่านมาแล้วครับ (ติดต่อ Admin หากจำเป็น)');
        }

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

            const payload = { action: 'create_multiple_bookings', dates: [targetDate], inspector_name: quickAddType === 'holiday' ? 'SYSTEM_HOLIDAY' : targetInspector, job_type: p_jobType, site_name: p_siteName, equipment_no: p_eq, user: user.username };
            const ok = await apiAction(payload, `กำลังบันทึก${quickAddType}...`);
            if(ok) { setModal(null); setSuccessModal('บันทึกสำเร็จ'); }
            return;
        }

        const isDup = (db.bookings || []).some(b => {
            const sameDate = b.date && String(b.date).split('T')[0] === targetDate;
            if (!sameDate) return false;
            if (b.id === modal?.data?.id) return false;
            if (String(b.inspector_name) === 'SYSTEM_HOLIDAY') return false;
            if (String(b.status) === 'cancelled') return false;
            if (String(b.equipment_no) === String(data.equipment_no)) return true;
            if (!isAdmin && String(b.inspector_name) === targetInspector) return true;
            return false;
        });
        if (isDup) return setAlertMsg(isAdmin ? `เลข Eq No. ${data.equipment_no} ถูกจองไปแล้วในวันนี้` : 'ผู้ตรวจคิวเต็มแล้วในวันนี้');
        if (!isAdmin && !/^\d{10}$/.test(data.tel)) return setAlertMsg('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก');
        if (isAdmin && data.tel && !/^\d{10}$/.test(data.tel)) return setAlertMsg('เบอร์โทรศัพท์ต้องมี 10 หลัก (หรือเว้นว่างไว้)');

        const jStart = fd.get('job_start_time');
        const jEnd = fd.get('job_end_time');
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

        if (isAdmin) { payload.layout_doc = data.layout_doc ? 'true' : 'false';
            payload.wiring_doc = data.wiring_doc ? 'true' : 'false'; payload.precheck_doc = data.precheck_doc ? 'true' : 'false';
        } 
        else if (modal?.data?.id) { payload.layout_doc = String(modal?.data?.layout_doc || 'false');
            payload.wiring_doc = String(modal?.data?.wiring_doc || 'false'); payload.precheck_doc = String(modal?.data?.precheck_doc || 'false');
        } 
        else { payload.layout_doc = 'false'; payload.wiring_doc = 'false'; payload.precheck_doc = 'false';
        }

        const ok = await apiAction(payload, modal?.data?.id ? 'กำลังอัปเดตข้อมูล...' : 'กำลังบันทึกคิวงาน...');
        if (ok) { setModal(null); setAreaSelection('กรุงเทพและปริมณฑล'); setJobTypeSelection('New'); setProductLineSelection('ES1,3300'); setLiveMapUrl(''); setSuccessModal(modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!'); }
    };

    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newTitle = fd.get('site_name');
        const newInspector = fd.get('inspector_name');
        const newDate = fd.get('date');
        const ok = await apiAction({ 
            action: 'update_booking', 
            id: modal.data.id, 
            site_name: newTitle, 
            inspector_name: newInspector, 
            date: newDate, 
            user: user.username 
        }, 'กำลังอัปเดต...');
        if(ok) { setModal(null); setSuccessModal('อัปเดตสำเร็จ'); }
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
                        <div className="settings-menu animate-pop w-[260px]">
                            <h4 className="text-sm font-bold border-b border-slate-200 pb-2 mb-3 text-slate-800 flex items-center gap-2">
                                <Icons.Settings /> ขนาดตารางและตัวอักษร
                            </h4>
                            
                            <div className="settings-group mb-3">
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
                                ↺ รีเซ็ตค่าเริ่มต้นทั้งหมด
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
                position: 'absolute', 
                bottom: 0, left: 0, right: 0, 
                transform: isNavVisible ? 'translateY(0)' : 'translateY(100%)', 
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 -4px 10px rgba(0,0,0,0.05)',
                zIndex: 50
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
                                    <button key={i} onClick={() => {
                                        setCurrentDate(new Date(pickerYear, i, 1));
                                        setPeriod(0);
                                        setShowMonthPicker(false);
                                    }} className={`py-3 rounded-xl text-sm font-bold border transition-all ${currentDate.getMonth() === i && currentDate.getFullYear() === pickerYear ? 'bg-red-600 text-white border-red-600 shadow-md' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 active:scale-95'}`}>
                                        {m}
                                    </button>
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
                                            <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{h.date ? String(h.date).split('T')[0] : ''}</div>
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
                                            <div className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">{h.date ? String(h.date).split('T')[0] : '-'}</div>
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
            {currentView === 'my_bookings' && user && !isAdmin && (
                <div className="page-view relative pb-20">
                    <div className="sticky top-0 bg-[#f1f5f9] z-10 pb-4 pt-2 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.List /> งานของฉัน</h2>
                    </div>
                    
                    <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1 mt-4 mb-4">
                        <button className={`flex-1 py-2 text-xs font-bold rounded-lg ${myBookingsTab === 'pending' ? 'bg-blue-50 text-blue-600' : 'text-slate-500'}`} onClick={() => setMyBookingsTab('pending')}>รอตรวจสอบ</button>
                        <button className={`flex-1 py-2 text-xs font-bold rounded-lg ${myBookingsTab === 'history' ? 'bg-slate-100 text-slate-700' : 'text-slate-500'}`} onClick={() => setMyBookingsTab('history')}>ประวัติย้อนหลัง</button>
                    </div>

                    <div className="space-y-4 pb-10">
                        {(() => {
                            const myTasks = (db.bookings || []).filter(b => b.created_by === user.username && String(b.status) !== 'cancelled');
                            const pendingTasks = myTasks.filter(b => b.date && b.date >= todayLocalString).sort((a,b) => new Date(a.date) - new Date(b.date));
                            const historyTasks = myTasks.filter(b => b.date && b.date < todayLocalString).sort((a,b) => new Date(b.date) - new Date(a.date));
                            const displayTasks = myBookingsTab === 'pending' ? pendingTasks : historyTasks.slice(0, myBookingsLimit);
                            
                            if (displayTasks.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีรายการงาน</div>;
                            
                            return (
                                <>
                                    {displayTasks.map((h, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                            {myBookingsTab === 'pending' && (
                                                <div className="absolute top-4 right-4 text-slate-400 p-1 cursor-pointer hover:bg-slate-100 rounded-md" onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)}>
                                                    <Icons.MoreVertical />
                                                </div>
                                            )}
                                            
                                            {actionMenuId === h.id && myBookingsTab === 'pending' && (
                                                <div className="absolute top-10 right-4 bg-white border border-slate-200 shadow-xl rounded-xl z-20 py-2 w-40 animate-pop">
                                                    <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2" onClick={() => { setModal({ type: 'booking', data: h }); setActionMenuId(null); }}><Icons.Edit /> แก้ไขข้อมูล</button>
                                                    <button className="w-full text-left px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2" onClick={() => handleCancelJob(h)}><Icons.Trash /> ยกเลิกคิวงาน</button>
                                                </div>
                                            )}

                                            <div className="font-bold text-slate-800 text-sm mb-1 mr-8">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold text-slate-500 mb-3 bg-slate-100 inline-block px-2 py-1 rounded">{h.date ? String(h.date).split('T')[0] : '-'}</div>
                                            
                                            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                                <div><span className="text-slate-400 text-[10px] block">Eq No.</span> <span className="font-bold">{h.equipment_no || '-'}</span></div>
                                                <div><span className="text-slate-400 text-[10px] block">ผู้ตรวจสอบ</span> <span className="font-bold">{h.inspector_name || '-'}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                    {myBookingsTab === 'history' && historyTasks.length > myBookingsLimit && (
                                        <button className="w-full py-3 mt-4 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl" onClick={() => setMyBookingsLimit(prev => prev + 20)}>โหลดเพิ่มเติม...</button>
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
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Shield /> จัดการระบบ</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 mb-6">
                        <button className={`p-4 rounded-2xl font-bold text-sm flex flex-col items-center justify-center gap-2 border-2 transition-all ${adminTab === 'menu' ? 'bg-white border-blue-500 text-blue-700 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600'}`} onClick={() => setAdminTab('menu')}>
                            <div className={`p-3 rounded-full ${adminTab === 'menu' ? 'bg-blue-100 text-blue-600' : 'bg-white shadow-sm'}`}><Icons.Settings /></div>
                            เมนูหลัก
                        </button>
                        <button className={`p-4 rounded-2xl font-bold text-sm flex flex-col items-center justify-center gap-2 border-2 transition-all ${adminTab === 'users' ? 'bg-white border-green-500 text-green-700 shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600'}`} onClick={() => setAdminTab('users')}>
                            <div className={`p-3 rounded-full ${adminTab === 'users' ? 'bg-green-100 text-green-600' : 'bg-white shadow-sm'}`}><Icons.User /></div>
                            ผู้ใช้งาน
                        </button>
                    </div>

                    {adminTab === 'menu' && (
                        <div className="space-y-4 animate-pop">
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Icons.Download /> ส่งออกข้อมูลรายงาน (Export)</h3>
                                <div className="space-y-2">
                                    <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-transform shadow-md" onClick={() => { window.open(`${SCRIPT_URL}?export=pdf&month=${currentDate.getMonth()+1}&year=${currentDate.getFullYear()}&period=${period}`, '_blank'); }}>Export เป็น PDF</button>
                                    <button className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl active:scale-95 transition-transform shadow-md" onClick={() => {
                                        setIsExporting(true);
                                        setTimeout(() => {
                                            const targetNode = document.getElementById('calendar-export-area');
                                            if (!targetNode) { setIsExporting(false); return setAlertMsg('ไม่พบตารางที่ต้องการบันทึก'); }
                                            setLoadingMsg('กำลังสร้างรูปภาพตาราง... อาจใช้เวลาสักครู่');
                                            
                                            html2canvas(targetNode, {
                                                scale: 2, useCORS: true, backgroundColor: '#f8fafc',
                                                windowWidth: targetNode.scrollWidth, windowHeight: targetNode.scrollHeight
                                            }).then(canvas => {
                                                const link = document.createElement('a');
                                                link.download = `SAIS_Schedule_${currentDate.getFullYear()}_${currentDate.getMonth()+1}_P${period+1}.jpg`;
                                                link.href = canvas.toDataURL('image/jpeg', 0.9);
                                                link.click();
                                                setIsExporting(false); setLoadingMsg(null); setSuccessModal('บันทึกรูปภาพสำเร็จ');
                                            }).catch(err => {
                                                setIsExporting(false); setLoadingMsg(null); setAlertMsg('เกิดข้อผิดพลาดในการบันทึกภาพ');
                                            });
                                        }, 500);
                                    }}>Export เป็น JPG (ภาพความละเอียดสูง)</button>
                                    <button className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl active:scale-95 transition-transform shadow-md" onClick={() => { window.open(`${SCRIPT_URL}?export=excel&month=${currentDate.getMonth()+1}&year=${currentDate.getFullYear()}&period=${period}`, '_blank'); }}>Export เป็น Excel (ข้อมูลดิบ)</button>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3">จัดการคิวงานล่วงหน้า</h3>
                                <button className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-md" onClick={() => setModal({ type: 'booking', data: { isAdminOverride: true } })}>
                                    <Icons.Plus /> เพิ่มคิวงาน (กำหนดวัน-ผู้ตรวจเอง)
                                </button>
                            </div>
                            
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Icons.Alert /> แจ้งเตือนทั้งระบบ</h3>
                                <button className="w-full py-3 bg-rose-600 text-white font-bold rounded-xl active:scale-95 transition-transform shadow-md" onClick={() => {
                                    setPromptDialog({
                                        msg: "พิมพ์ข้อความที่ต้องการแจ้งให้ทุกคนทราบ:",
                                        onSubmit: async (text) => {
                                            if(!text) return;
                                            const ok = await apiAction({ action: 'send_broadcast', message: text, sender: user.username }, 'กำลังส่งประกาศ...');
                                            if(ok) setSuccessModal('ส่งประกาศสำเร็จ');
                                        }
                                    });
                                }}>สร้างประกาศใหม่ (Broadcast)</button>
                            </div>
                            
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Icons.Trash /> ล้างข้อมูลเก่า</h3>
                                <button className="w-full py-3 bg-red-100 text-red-600 border border-red-300 font-bold rounded-xl active:scale-95 transition-transform" onClick={() => {
                                    setConfirmDialog({
                                        msg: "คุณแน่ใจหรือไม่ที่จะลบข้อมูลที่ผ่านมาแล้วเกิน 3 เดือน? (การกระทำนี้ไม่สามารถกู้คืนได้)",
                                        onConfirm: async () => {
                                            setConfirmDialog(null);
                                            const ok = await apiAction({ action: 'clean_old_data', user: user.username }, 'กำลังล้างข้อมูล...');
                                            if(ok) setSuccessModal('ล้างข้อมูลเก่าสำเร็จ');
                                        }
                                    });
                                }}>ลบข้อมูลที่เก่ากว่า 3 เดือน</button>
                            </div>
                        </div>
                    )}

                    {adminTab === 'users' && (
                        <div className="space-y-3 animate-pop">
                            {(adminDb.users || []).map((u, i) => (
                                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold"><Icons.User /></div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800">{u.username}</div>
                                            <div className="text-[10px] text-slate-500">สมัครเมื่อ: {u.created_at ? String(u.created_at).split('T')[0] : '-'}</div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>{u.role === 'admin' ? 'ADMIN' : 'USER'}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 📍 หน้าต่างรายละเอียดการ์ด (โหมดดูอย่างเดียว สำหรับ User ทั่วไป) */}
            {modal?.type === 'detail' && (
                <div className="backdrop z-[150]">
                    <div className="modal-card p-6">
                        <button onClick={() => setModal(null)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                        
                        <div className="space-y-3 text-sm text-slate-700 mb-6">
                            <div><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold">{modal.data.date ? String(modal.data.date).split('T')[0] : '-'}</span></div>
                            <div><span className="text-slate-400 text-xs block">ผู้รับผิดชอบ</span><span className="font-bold">{modal.data.inspector_name === 'SYSTEM_HOLIDAY' || modal.data.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : modal.data.inspector_name}</span></div>
                            <div><span className="text-slate-400 text-xs block">ชื่อรายการ / โครงการ</span><span className="font-bold whitespace-pre-wrap">{modal.data.site_name}</span></div>
                            
                            {!String(modal.data.job_type).includes('leave') && !String(modal.data.job_type).includes('event') && !String(modal.data.job_type).includes('holiday') && (
                                <>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><span className="text-slate-400 text-xs block">Eq No.</span><span className="font-bold">{modal.data.equipment_no || '-'}</span></div>
                                        <div><span className="text-slate-400 text-xs block">Unit</span><span className="font-bold">{modal.data.unit_no || '-'}</span></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><span className="text-slate-400 text-xs block">ประเภทงาน</span><span className="font-bold">{modal.data.job_type || '-'}</span></div>
                                        <div><span className="text-slate-400 text-xs block">พื้นที่</span><span className="font-bold">{modal.data.area || '-'}</span></div>
                                    </div>
                                </>
                            )}
                            
                            {/* 📍 FIX: ฟังก์ชั่นแผนที่ (Google Maps) ที่หายไป นำกลับมาใส่ไว้ที่นี่แล้ว */}
                            {modal.data.map_link && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-700 mb-2">📍 แผนที่ (Google Maps)</h4>
                                    <iframe 
                                        src={utils.getMapEmbedUrl(modal.data.map_link)} 
                                        className="w-full h-48 rounded-xl border border-slate-200 bg-slate-50" 
                                        allowFullScreen loading="lazy" referrerPolicy="no-referrer"
                                    ></iframe>
                                    <a href={modal.data.map_link} target="_blank" className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-blue-100 transition-all w-full justify-center">
                                        เปิดนำทางในแอป Google Maps
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}

            {/* 📍 หน้าต่างจัดการคิวงาน (Task Action Menu) */}
            {modal?.type === 'task_action' && (
                <div className="backdrop z-[150]">
                    <div className="modal-card p-6 text-center animate-pop">
                        <button onClick={() => setModal(null)} className="btn-close-modern"><Icons.X /></button>
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icons.Settings />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">เมนูจัดการข้อมูล</h3>
                        <p className="text-xs text-slate-500 mb-6 truncate px-4">{modal.data.site_name || modal.data.equipment_no}</p>
                        
                        <div className="space-y-3">
                            <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl active:scale-95 shadow-md flex items-center justify-center gap-2" 
                                onClick={() => { 
                                    const tDate = modal.data.date;
                                    const isPast = tDate && tDate < todayLocalString;
                                    if(isPast && !isAdmin) return setAlertMsg('ไม่อนุญาตให้แก้ไขข้อมูลย้อนหลัง');
                                    
                                    const jt = String(modal.data.job_type).toLowerCase();
                                    const isSpecial = jt === 'public_holiday' || jt === 'company_event' || jt === 'leave' || String(modal.data.equipment_no).startsWith('HLD_') || String(modal.data.equipment_no).startsWith('EVENT_') || String(modal.data.equipment_no).startsWith('LEAVE_');
                                    
                                    if (isSpecial && isAdmin) {
                                        setModal({ type: 'edit_special', data: modal.data });
                                    } else {
                                        setAreaSelection(modal.data.area || 'กรุงเทพและปริมณฑล');
                                        setJobTypeSelection(modal.data.job_type || 'New');
                                        setProductLineSelection(modal.data.product_line || 'ES1,3300');
                                        handleMapChange(modal.data.map_link || '');
                                        setModal({ type: 'booking', data: modal.data });
                                    }
                                }}>
                                <Icons.Edit /> แก้ไขข้อมูลรายการนี้
                            </button>
                            <button className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl active:scale-95 border border-slate-200 flex items-center justify-center gap-2" onClick={() => setModal({ type: 'detail', data: modal.data })}>
                                <Icons.Eye /> ดูรายละเอียดทั้งหมด
                            </button>
                            <button className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl active:scale-95 border border-red-200 flex items-center justify-center gap-2 mt-4" onClick={() => handleCancelBooking(modal.data)}>
                                <Icons.Trash /> ลบรายการนี้ทิ้ง
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 📍 หน้าต่างเมนูคลิกเซลล์ว่างสำหรับ Admin */}
            {modal?.type === 'admin_cell_action' && (
                <div className="backdrop z-[150]">
                    <div className="bg-white w-[90%] max-w-[400px] rounded-2xl shadow-2xl overflow-hidden animate-pop">
                        <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">เพิ่มข้อมูลแบบรวดเร็ว</h3>
                                <div className="text-xs text-slate-300">{modal.data.date} | {modal.data.inspector_name}</div>
                            </div>
                            <button onClick={() => setModal(null)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"><Icons.X /></button>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                            <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-bold active:scale-95" onClick={() => { setQuickAddType('job'); setModal({ type: 'booking', data: modal.data }); }}>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500"><Icons.Plus /></div>
                                จองคิวงานปกติ
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-700 font-bold active:scale-95" onClick={() => { setQuickAddType('leave'); setModal({ type: 'booking', data: modal.data }); }}>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-yellow-500"><Icons.User /></div>
                                บันทึกการลา
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 font-bold active:scale-95" onClick={() => { setQuickAddType('event'); setModal({ type: 'booking', data: modal.data }); }}>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-green-500"><Icons.Star /></div>
                                บันทึกกิจกรรม
                            </button>
                            <button className="flex flex-col items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-bold active:scale-95" onClick={() => { setQuickAddType('holiday'); setModal({ type: 'booking', data: modal.data }); }}>
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500"><Icons.CalendarX /></div>
                                ประกาศวันหยุดรวม
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 📍 หน้าต่างฟอร์มจองคิวงาน / ลา / หยุด */}
            {modal?.type === 'booking' && (
                <div className="backdrop z-[150]">
                    <div className="modal-card flex flex-col h-full max-h-[90vh]">
                        <div className="flex-shrink-0 p-4 border-b border-slate-200 flex justify-between items-center bg-white z-10 sticky top-0">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{modal.data?.id ? 'แก้ไขข้อมูล' : 'จองคิวงาน / เพิ่มข้อมูล'}</h3>
                                {modal.data?.isAdminOverride ? <div className="text-xs text-blue-600 font-bold">โหมดเพิ่มอิสระ (Admin)</div> : <div className="text-[10px] text-slate-500">สำหรับวันที่ {modal.data?.date}</div>}
                            </div>
                            <button type="button" onClick={() => { setModal(null); setLiveMapUrl(''); }} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200"><Icons.X /></button>
                        </div>

                        {!modal.data?.id && !modal.data?.isAdminOverride && (
                            <div className="flex bg-slate-100 p-1 mx-4 mt-4 rounded-xl flex-shrink-0">
                                <button className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'job' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`} onClick={() => setQuickAddType('job')}>งานตรวจ</button>
                                <button className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'leave' ? 'bg-white shadow-sm text-yellow-600' : 'text-slate-500'}`} onClick={() => setQuickAddType('leave')}>แจ้งลา</button>
                                {isAdmin && (
                                    <>
                                        <button className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'event' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500'}`} onClick={() => setQuickAddType('event')}>กิจกรรม</button>
                                        <button className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${quickAddType === 'holiday' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500'}`} onClick={() => setQuickAddType('holiday')}>วันหยุดรวม</button>
                                    </>
                                )}
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <form id="bookingForm" onSubmit={handleBookingSubmit} className="space-y-4 pb-20">
                                {modal.data?.isAdminOverride && (
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4 space-y-3">
                                        <div>
                                            <label className="text-xs font-bold text-blue-800 mb-1 block">ระบุวันที่ต้องการจอง</label>
                                            <input type="date" name="admin_date_target" required className="w-full border border-blue-200 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-blue-500" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-blue-800 mb-1 block">เลือกผู้ตรวจสอบ</label>
                                            <select name="admin_inspector_target" required className="w-full border border-blue-200 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-blue-500">
                                                <option value="">-- เลือกผู้ตรวจ --</option>
                                                {db.inspectors.map(ins => <option key={ins.id} value={ins.name}>{ins.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {quickAddType === 'job' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">Eq No. <span className="text-red-500">*</span></label>
                                                <input name="equipment_no" defaultValue={modal.data?.equipment_no} required className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all uppercase placeholder-slate-400" placeholder="10 หลัก" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">Unit</label>
                                                <input name="unit_no" defaultValue={modal.data?.unit_no} className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400" placeholder="ระบุ unit" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block flex justify-between">
                                                <span>ชื่อโครงการ / ไซต์งาน <span className="text-red-500">*</span></span>
                                                <span className="text-[10px] text-slate-400 font-normal">หากต้องการจองระบุเวลา ให้กรอกด้านล่าง</span>
                                            </label>
                                            
                                            <div className="grid grid-cols-2 gap-2 mb-2">
                                                <div>
                                                    <div className="text-[10px] text-slate-500 mb-1">เวลาเริ่ม (ถ้ามี)</div>
                                                    <input type="time" name="job_start_time" className="w-full border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-700" />
                                                </div>
                                                <div>
                                                    <div className="text-[10px] text-slate-500 mb-1">เวลาสิ้นสุด (ถ้ามี)</div>
                                                    <input type="time" name="job_end_time" className="w-full border border-slate-300 rounded-lg p-2 text-xs font-bold text-slate-700" />
                                                </div>
                                            </div>

                                            <textarea name="site_name" defaultValue={modal.data?.site_name} required rows="2" className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400" placeholder="พิมพ์ชื่อสถานที่"></textarea>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block">ประเภทงาน</label>
                                            <select value={jobTypeSelection} onChange={(e) => setJobTypeSelection(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-blue-500">
                                                <option value="New">New</option><option value="MOD">MOD</option><option value="Re-ins">Re-ins</option>
                                                <option value="Temporary">Temporary</option><option value="Builder Lift">Builder Lift</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">พื้นที่</label>
                                                <select value={areaSelection} onChange={(e) => setAreaSelection(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-blue-500">
                                                    <option value="กรุงเทพและปริมณฑล">กทม./ปริมณฑล</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option><option value="ไม่ระบุ">ไม่ระบุ</option><option value="other">อื่นๆ (ระบุเอง)</option>
                                                </select>
                                                {areaSelection === 'other' && <input name="custom_area" required className="w-full mt-2 border border-blue-300 rounded-lg p-2 text-xs bg-blue-50 outline-none" placeholder="ระบุพื้นที่..." />}
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">Product Line</label>
                                                <select value={productLineSelection} onChange={(e) => setProductLineSelection(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-blue-500">
                                                    {Object.keys(PRODUCT_COLORS).map(k => <option key={k} value={k}>{k}</option>)}
                                                </select>
                                                {productLineSelection === 'อื่นๆโปรดระบุ' && <input name="custom_product_line" required className="w-full mt-2 border border-blue-300 rounded-lg p-2 text-xs bg-blue-50 outline-none" placeholder="ระบุ Product..." />}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block">ลิงก์ Google Maps <span className="font-normal text-slate-400 text-[10px]">(ไม่บังคับ)</span></label>
                                            <input name="map_link" defaultValue={modal.data?.map_link} onChange={(e) => handleMapChange(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400" placeholder="วางลิงก์จาก Google Maps ที่นี่" />
                                            {liveMapUrl && <div className="mt-2"><iframe src={liveMapUrl} className="w-full h-32 rounded-xl border border-slate-200" allowFullScreen loading="lazy"></iframe></div>}
                                        </div>

                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block">เบอร์โทรศัพท์ติดต่อ <span className="font-normal text-slate-400 text-[10px]">({isAdmin ? 'ไม่บังคับ' : 'บังคับ 10 หลัก'})</span></label>
                                            <input type="tel" name="tel" defaultValue={modal.data?.tel} required={!isAdmin} maxLength="10" pattern="\d{10}" className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400" placeholder="08XXXXXXXX" />
                                        </div>
                                    </>
                                )}

                                {quickAddType === 'leave' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block">ประเภทการลา</label>
                                            <select name="leave_type" required className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-yellow-500" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                                <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option><option value="อื่นๆโปรดระบุ">อื่นๆ (ระบุเอง)</option>
                                            </select>
                                            {leaveType === 'อื่นๆโปรดระบุ' && <input name="custom_leave" required className="w-full mt-2 border border-yellow-300 rounded-lg p-2.5 bg-yellow-50 text-sm font-bold text-slate-700 outline-none focus:border-yellow-500" placeholder="ระบุสาเหตุการลา..." />}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">เริ่มเวลา (ไม่บังคับ)</label>
                                                <input type="time" name="start_time" className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-yellow-500" value={leaveStartTime} onChange={e => setLeaveStartTime(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">ถึงเวลา (ไม่บังคับ)</label>
                                                <input type="time" name="end_time" className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-yellow-500" value={leaveEndTime} onChange={e => setLeaveEndTime(e.target.value)} />
                                            </div>
                                        </div>
                                        {leaveMins > 0 && <div className="text-xs text-yellow-600 font-bold mt-1 text-right">รวมระยะเวลา: {formatDuration(leaveMins)}</div>}
                                    </div>
                                )}

                                {quickAddType === 'event' && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block">ชื่อกิจกรรม / หัวข้อ</label>
                                            <input name="site_name" required className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-green-500" placeholder="เช่น ประชุมแผนกประจำเดือน, อบรมความปลอดภัย..." />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">เริ่มเวลา (ไม่บังคับ)</label>
                                                <input type="time" name="start_time" className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-green-500" value={eventStartTime} onChange={e => setEventStartTime(e.target.value)} />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-600 mb-1 block">ถึงเวลา (ไม่บังคับ)</label>
                                                <input type="time" name="end_time" className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-green-500" value={eventEndTime} onChange={e => setEventEndTime(e.target.value)} />
                                            </div>
                                        </div>
                                        {eventMins > 0 && <div className="text-xs text-green-600 font-bold mt-1 text-right">รวมระยะเวลา: {formatDuration(eventMins)}</div>}
                                    </div>
                                )}

                                {quickAddType === 'holiday' && (
                                    <div className="space-y-4">
                                        <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
                                            <b>คำแนะนำ:</b> การประกาศวันหยุดรวม จะบล็อกการจองคิวงานในวันนั้นของทุกคนอัตโนมัติ (แต่ไม่ลบงานที่เคยจองไว้แล้ว)
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-600 mb-1 block">ชื่อวันหยุด</label>
                                            <input name="site_name" required className="w-full border border-slate-300 rounded-lg p-2.5 bg-white text-sm font-bold text-slate-700 outline-none focus:border-red-500" placeholder="เช่น วันสงกรานต์, วันปีใหม่..." />
                                        </div>
                                    </div>
                                )}

                                {/* Admin Checklist */}
                                {isAdmin && quickAddType === 'job' && (
                                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mt-4">
                                        <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1"><Icons.FileCheck /> ส่วนตรวจสอบของ Admin</h4>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                                                <input type="checkbox" name="layout_doc" defaultChecked={String(modal.data?.layout_doc) === 'true'} className="w-5 h-5 accent-blue-600" />
                                                <span className="text-sm font-bold text-slate-700">ได้รับเอกสาร Layout</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                                                <input type="checkbox" name="wiring_doc" defaultChecked={String(modal.data?.wiring_doc) === 'true'} className="w-5 h-5 accent-blue-600" />
                                                <span className="text-sm font-bold text-slate-700">ได้รับเอกสาร Wiring</span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                                                <input type="checkbox" name="precheck_doc" defaultChecked={String(modal.data?.precheck_doc) === 'true'} className="w-5 h-5 accent-blue-600" />
                                                <span className="text-sm font-bold text-slate-700">ได้รับเอกสาร Precheck</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                            </form>
                        </div>
                        
                        <div className="p-4 border-t border-slate-200 bg-white flex-shrink-0 z-10 sticky bottom-0 left-0 right-0">
                            <button type="submit" form="bookingForm" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl text-base shadow-lg active:scale-95 transition-transform flex justify-center items-center gap-2">
                                <Icons.Check /> บันทึกข้อมูล
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showLogin && (
                <div className="backdrop z-[200]">
                    <div className="bg-white rounded-3xl w-[90%] max-w-sm overflow-hidden shadow-2xl animate-pop relative">
                        <button className="absolute top-4 right-4 bg-white/20 text-white hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all z-10" onClick={() => setShowLogin(false)}><Icons.X /></button>
                        
                        <div className="bg-slate-800 p-6 pt-8 text-center relative overflow-hidden">
                            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                            <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 bg-red-500 rounded-full blur-2xl opacity-20"></div>
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg relative z-10 transform -rotate-3"><span className="text-3xl font-black text-slate-800 tracking-tighter">SAIS</span></div>
                            <h2 className="text-xl font-bold text-white relative z-10">{isRegisterMode ? 'สร้างบัญชีใหม่' : 'เข้าสู่ระบบ'}</h2>
                            <p className="text-xs text-slate-300 mt-1 relative z-10">{isRegisterMode ? 'ลงทะเบียนเพื่อใช้งานระบบจองคิว' : 'กรุณายืนยันตัวตนเพื่อเข้าใช้งาน'}</p>
                        </div>

                        <form className="p-6 space-y-4 bg-slate-50" onSubmit={async (e) => {
                            e.preventDefault(); const fd = new FormData(e.target);
                            const u = fd.get('username'); const p = fd.get('password');
                            if(!u || !p) return setAlertMsg('กรุณากรอกข้อมูลให้ครบถ้วน');
                            if (u.length < 4) return setAlertMsg('ชื่อผู้ใช้ต้องมีอย่างน้อย 4 ตัวอักษร');
                            if (p.length < 4) return setAlertMsg('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร');

                            setLoadingMsg(isRegisterMode ? 'กำลังสร้างบัญชี...' : 'กำลังเข้าสู่ระบบ...');
                            try {
                                const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: isRegisterMode ? 'register' : 'login', username: u, password: p }) });
                                const result = await res.json();
                                setLoadingMsg(null);
                                if (result.status === 'ok') {
                                    const userData = { username: result.username, role: result.role || 'user' };
                                    localStorage.setItem('sais_user', JSON.stringify(userData));
                                    localStorage.setItem('sais_session_time', Date.now().toString());
                                    setUser(userData); setShowLogin(false); setSuccessModal(isRegisterMode ? 'ลงทะเบียนสำเร็จ!' : 'เข้าสู่ระบบสำเร็จ');
                                    fetchCoreData(true, null);
                                    if(userData.role === 'admin' || userData.username === ADMIN_USERNAME) fetchAdminData();
                                } else { setAlertMsg(result.message || 'รหัสผ่านไม่ถูกต้อง'); }
                            } catch(err) { setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                        }}>
                            <div>
                                <label className="text-xs font-bold text-slate-600 mb-1.5 block">ชื่อผู้ใช้ (Username)</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Icons.User /></div>
                                    <input name="username" required className="w-full border border-slate-300 rounded-xl p-3 pl-10 bg-white text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all lowercase" placeholder="ชื่อภาษาอังกฤษเท่านั้น" pattern="[a-zA-Z0-9_]+" title="ภาษาอังกฤษ ตัวเลข หรือขีดล่าง เท่านั้น" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-600 mb-1.5 block">รหัสผ่าน (Password)</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Icons.Shield /></div>
                                    <input type={showPassword ? "text" : "password"} name="password" required className="w-full border border-slate-300 rounded-xl p-3 pl-10 pr-10 bg-white text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all" placeholder="••••••••" />
                                    <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 p-1 hover:bg-slate-100 rounded-full" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                                    </button>
                                </div>
                            </div>
                            
                            <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl text-sm shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 active:scale-95 transition-all mt-2">
                                {isRegisterMode ? 'ยืนยันลงทะเบียน' : 'เข้าสู่ระบบ'}
                            </button>
                        </form>
                        
                        <div className="bg-slate-100 p-4 text-center border-t border-slate-200">
                            <p className="text-xs text-slate-500 font-bold mb-2">{isRegisterMode ? 'มีบัญชีอยู่แล้ว?' : 'ยังไม่มีบัญชี?'}</p>
                            <button className="text-sm font-bold text-blue-600 bg-white border border-slate-200 px-6 py-2 rounded-full hover:bg-blue-50 transition-all active:scale-95 shadow-sm" onClick={() => setIsRegisterMode(!isRegisterMode)}>
                                {isRegisterMode ? 'สลับไปเข้าสู่ระบบ' : 'สร้างบัญชีใหม่ตอนนี้'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {alertMsg && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-pop border border-slate-100">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                        <p className="text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95 transition-transform shadow-md hover:bg-slate-700">ตกลง</button>
                    </div>
                </div>
            )}

            {confirmDialog && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-pop">
                        <div className="w-16 h-16 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm text-2xl">⚠️</div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยันการดำเนินการ</h3>
                        <p className="text-sm text-slate-600 mb-6 font-bold">{confirmDialog.msg}</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">ยกเลิก</button>
                            <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-blue-700 transition-all">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {promptDialog && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2"><Icons.Edit /> ระบุข้อมูล</h3>
                        <p className="text-sm text-slate-600 mb-4">{promptDialog.msg}</p>
                        <form onSubmit={(e) => { e.preventDefault(); promptDialog.onSubmit(e.target.reason.value); setPromptDialog(null); }}>
                            <input name="reason" autoFocus required className="w-full border border-slate-300 rounded-xl p-3 bg-slate-50 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 mb-5" placeholder="พิมพ์ข้อความที่นี่..." />
                            <div className="flex gap-3">
                                <button type="button" onClick={() => setPromptDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all">ยกเลิก</button>
                                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all">ตกลง</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showActivityModal && (
                <div className="fixed inset-0 z-[150] bg-slate-100 flex flex-col animate-pop">
                    <div className="bg-white px-4 py-3 flex justify-between items-center shadow-sm border-b relative z-10">
                        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Icons.Bell /> ศูนย์แจ้งเตือน & กิจกรรม</h2>
                        <button onClick={() => setShowActivityModal(false)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200"><Icons.X /></button>
                    </div>
                    
                    <div className="flex bg-white px-4 border-b">
                        <button className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${activityTab === 'notif' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`} onClick={() => setActivityTab('notif')}>
                            แจ้งเตือนระบบ {unreadNotifs.length > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-1">{unreadNotifs.length}</span>}
                        </button>
                        {isAdmin && (
                            <button className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${activityTab === 'logs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`} onClick={() => setActivityTab('logs')}>
                                ประวัติการใช้งาน (Logs)
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {activityTab === 'notif' && (
                            <div className="space-y-3 pb-20">
                                {(() => {
                                    const userNotifs = (db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
                                    if(userNotifs.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl bg-white mt-4">ไม่มีการแจ้งเตือนใหม่</div>;
                                    
                                    return userNotifs.map((n, i) => (
                                        <div key={i} className={`p-4 rounded-xl border transition-all ${String(n.isRead) === 'true' ? 'bg-white border-slate-200 opacity-70' : 'bg-blue-50 border-blue-200 shadow-sm'}`} onClick={() => String(n.isRead) !== 'true' && markNotifAsRead(n.id)}>
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                                                    {String(n.isRead) !== 'true' && <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>}
                                                    {n.title}
                                                </div>
                                                <div className="text-[10px] text-slate-400">{n.created_at ? new Date(n.created_at).toLocaleString('th-TH') : ''}</div>
                                            </div>
                                            <div className="text-xs text-slate-600 mt-2 ml-4">{n.message}</div>
                                        </div>
                                    ));
                                })()}
                            </div>
                        )}
                        
                        {activityTab === 'logs' && isAdmin && (
                            <div className="space-y-3 pb-20">
                                {(() => {
                                    const sysLogs = (adminDb.logs || []).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
                                    if(sysLogs.length === 0) return <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl bg-white mt-4">ไม่มีประวัติระบบ</div>;
                                    
                                    return (
                                        <>
                                            {sysLogs.slice(0, logsLimit).map((l, i) => (
                                                <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-1">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600"><Icons.User /> {l.user}</span>
                                                        <span className="text-[10px] text-slate-400">{l.timestamp ? new Date(l.timestamp).toLocaleString('th-TH') : ''}</span>
                                                    </div>
                                                    <div className="text-xs font-bold text-slate-700 mt-1">{l.action}</div>
                                                    <div className="text-[10px] text-slate-500 truncate max-w-full">{l.detail}</div>
                                                </div>
                                            ))}
                                            {sysLogs.length > logsLimit && (
                                                <button className="w-full py-3 mt-4 text-xs font-bold text-blue-600 bg-blue-50 rounded-xl" onClick={() => setLogsLimit(prev => prev + 20)}>โหลดเพิ่มเติม...</button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showManual && (
                <div className="fixed inset-0 z-[200] bg-slate-100 flex flex-col animate-pop">
                    <div className="bg-slate-800 px-4 py-3 flex justify-between items-center text-white shadow-md relative z-10">
                        <h2 className="text-lg font-bold flex items-center gap-2"><Icons.Book /> คู่มือการใช้งานระบบ</h2>
                        <button onClick={() => setShowManual(false)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"><Icons.X /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10 custom-scrollbar bg-slate-50">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-blue-600 font-bold mb-3 border-b pb-2 flex items-center gap-2"><Icons.Home /> พื้นฐานการใช้งานตาราง</h3>
                            <ul className="text-sm space-y-2 text-slate-700 list-disc pl-5 font-medium">
                                <li><strong>ลากเพื่อรีเฟรช (Pull to Refresh):</strong> แตะที่ว่างในตารางแล้วดึงลงเพื่ออัปเดตข้อมูลล่าสุด</li>
                                <li><strong>ดูรายละเอียดงาน:</strong> แตะ 1 ครั้งที่การ์ดงานเพื่อดูรายละเอียด, แผนที่นำทาง และเวลา</li>
                                <li><strong>การจองคิว:</strong> แตะที่ช่องว่างของวันที่และผู้ตรวจที่ต้องการ เพื่อเปิดฟอร์มจอง</li>
                            </ul>
                        </div>
                        
                        {isAdmin && (
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-red-600 font-bold mb-3 border-b pb-2 flex items-center gap-2"><Icons.Shield /> สำหรับ Admin</h3>
                                <ul className="text-sm space-y-2 text-slate-700 list-disc pl-5 font-medium">
                                    <li><strong>ย้ายคิวแบบไว (Drag & Drop):</strong> กดค้างที่การ์ดงานแล้วลากไปวางในช่องวันที่/ผู้ตรวจอื่นที่ต้องการได้ทันที</li>
                                    <li><strong>จัดการด่วน (Action Menu):</strong> แตะที่การ์ดงานใดๆ เพื่อเปิดเมนูแก้ไข/ลบ โดยไม่ต้องเข้าหน้าฟอร์มลึก</li>
                                    <li><strong>เพิ่มงานแบบรวดเร็ว:</strong> แตะช่องว่าง จะมีเมนูให้เลือกทันทีว่าจะเพิ่ม งานตรวจ / ลา / กิจกรรม / วันหยุดรวม</li>
                                    <li><strong>พิมพ์เอกสาร / Export:</strong> ไปที่แท็บ "จัดการ" เลือก Export เป็น PDF, Excel หรือรูปภาพ JPG ได้</li>
                                    <li><strong>ประกาศให้ทุกคนทราบ:</strong> ไปที่แท็บ "จัดการ" เลือก "สร้างประกาศใหม่" ข้อความจะเด้งแจ้งเตือนทุกคน</li>
                                </ul>
                            </div>
                        )}

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-emerald-600 font-bold mb-3 border-b pb-2 flex items-center gap-2">🎨 ความหมายของสีการ์ดงาน</h3>
                            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#e2e8f0] border border-slate-300 rounded"></div> งานตรวจทั่วไป</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#64748b] rounded"></div> งาน MOD</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#f472b6] rounded"></div> งานต่างจังหวัด</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#fef08a] border border-yellow-400 rounded"></div> Builder Lift / Temporary</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#eab308] rounded text-white flex items-center justify-center text-[8px]">ลา</div> ลางาน</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#22c55e] rounded text-white flex items-center justify-center text-[8px]">★</div> กิจกรรม/อบรม</div>
                                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-[#D0021B] rounded text-white flex items-center justify-center text-[8px]">!</div> วันหยุดประจำปี</div>
                            </div>
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
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg active:scale-95">โหลดหน้าเว็บใหม่</button>
                </div>
            );
        }
        return this.props.children;
    }
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<ErrorBoundary><App /></ErrorBoundary>);
}
