const CalendarGrid = React.memo(({ daysInView, db, isAdmin, user, setShowLogin, setModal, setAlertMsg, handleDrop, handleDragOver, handleDragLeave, handleDragStart, setConfirmDialog, apiAction, setQuickAddType }) => {
    
    // ฟังก์ชันช่วยเปิดเผยการ์ดที่ซ่อนไว้ (ข้อ 3.2)
    const [expandedCells, setExpandedCells] = useState({});
    const toggleExpand = (e, cellKey) => { e.stopPropagation(); setExpandedCells(prev => ({...prev, [cellKey]: !prev[cellKey]})); };

    return (
        <div id="calendar-export-area" className="calendar-grid" style={{ '--col-count': (db.inspectors || []).length || 1 }}>
            <div className="sticky-corner text-[10px] font-bold">DATE</div>
            {(db.inspectors || []).map((ins, i) => (
                <div key={i} className="sticky-top"><div className="font-bold truncate w-full text-center px-1 text-[11px] py-1">{ins.name || '-'}</div></div>
            ))}

            {daysInView.map((d, index) => {
                let headerClass = '';
                if (d.isGlobalHoliday) headerClass = 'is-sunday-col';
                else if (d.isGlobalEvent) headerClass = 'is-global-event-col';

                return (
                    <React.Fragment key={index}>
                        <div className={`sticky-left ${headerClass} ${d.isToday ? 'is-today-row' : ''}`}>
                            {!d.isEmpty && (<><span className="leading-none font-bold text-sm">{d.day}</span><span className="text-[9px] mt-0.5 font-bold uppercase opacity-80">{d.weekday}</span></>)}
                        </div>
                        
                        {!d.isEmpty && (db.inspectors || []).map((ins, idx) => {
                            const cellKey = `${d.full}_${ins.name}`;
                            const isExpanded = expandedCells[cellKey];

                            const cellTasks = (db.bookings || []).filter(b => b.date && String(b.date).split('T')[0] === d.full && String(b.inspector_name) === String(ins.name) && String(b.status) !== 'cancelled');
                            const hasTask = cellTasks.length > 0;
                            const hasLeave = cellTasks.some(t => t.job_type === 'leave' || String(t.equipment_no).toLowerCase().startsWith('leave_'));
                            
                            const isBlockedForNormalUser = d.isGlobalHoliday || d.isGlobalEvent || hasLeave;

                            let cellHolidayClass = '';
                            if (!hasTask) {
                                if (d.isGlobalHoliday) cellHolidayClass = 'is-holiday-cell'; 
                                else if (d.isGlobalEvent) cellHolidayClass = 'is-global-event-cell'; 
                            }

                            // 📍 [ข้อ 3.2] โชว์สูงสุดแค่ 3 การ์ด ถ้ายังไม่กาง
                            const visibleTasks = isExpanded ? cellTasks : cellTasks.slice(0, 3);
                            const hiddenCount = cellTasks.length - 3;

                            return (
                                <div key={idx} 
                                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, d.full, ins.name)}
                                    className={`grid-cell hover:bg-slate-50 ${cellHolidayClass} ${d.isToday && !cellHolidayClass ? 'is-today-row' : ''}`}
                                    onClick={() => {
                                        if (!isAdmin && isBlockedForNormalUser) return; 
                                        if (!user) return setShowLogin(true);
                                        const todayLocalString = window.SAIS_UTILS?.getLocalDateString(new Date());
                                        if (d.full < todayLocalString && !isAdmin) return setAlertMsg('ไม่สามารถจองคิวงานย้อนหลังได้ครับ');
                                        setQuickAddType('job'); 
                                        setModal({ type: 'booking', data: { date: d.full, inspector_name: ins.name } });
                                    }}>
                                    
                                    {d.isGlobalHoliday && d.globalHolidays.map((gh, ghi) => <div key={'gh'+ghi} className="holiday-label-new" onClick={(e) => e.stopPropagation()}>{gh.site_name}</div>)}
                                    {d.isGlobalEvent && !hasLeave && d.globalEvents.map((ge, gei) => <div key={'ge'+gei} className="holiday-label-new" onClick={(e) => e.stopPropagation()}>{ge.site_name}</div>)}
                                    
                                    {visibleTasks.map((task, tIdx) => {
                                        let cardTypeClass = 'card-type-new', areaClass = ''; 
                                        
                                        // 📍 [ข้อ 1.1] เลิกใช้ String matching ดักสี เปลี่ยนมาใช้ตัวแปรบังคับเท่านั้น
                                        const isLeaveCard = task.job_type === 'leave';
                                        const isEventCard = task.job_type === 'company_event';
                                        const isHolidayCard = task.job_type === 'public_holiday';
                                        const isUpcountry = task.area && task.area !== 'กรุงเทพและปริมณฑล' && task.area !== 'ไม่ระบุ';

                                        if (isHolidayCard) cardTypeClass = 'card-type-holiday';
                                        else if (isEventCard) cardTypeClass = 'card-type-event'; 
                                        else if (isLeaveCard) cardTypeClass = 'card-type-leave';
                                        else if (isUpcountry) cardTypeClass = 'card-type-upcountry';
                                        else if (task.job_type === 'MOD') cardTypeClass = 'card-type-mod';
                                        else if (task.job_type === 'Re-ins temporary power supply' || task.job_type === 'Re-ins builder lift') cardTypeClass = 'card-type-reins';
                                        else cardTypeClass = 'card-type-new';

                                        return (
                                            <div key={task.id || tIdx} 
                                                draggable={isAdmin && !isLeaveCard && !isEventCard && !isHolidayCard} 
                                                onDragStart={(e) => handleDragStart(e, task.id)} 
                                                className={`task-content ${cardTypeClass} ${areaClass}`}
                                                onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    if (!isAdmin && (isLeaveCard || isEventCard || isHolidayCard)) return;
                                                    if (isLeaveCard || isEventCard || isHolidayCard) {
                                                        if(isAdmin) setModal({ type: 'edit_special', data: task });
                                                    } else { setModal({ type: 'detail', data: task }); }
                                                }}>
                                                {isLeaveCard || isEventCard || isHolidayCard ? (
                                                    <div className="special-event-text auto-text">{task.site_name}</div>
                                                ) : (
                                                    <>
                                                        <div className="text-line-1 auto-text">{task.equipment_no} <span className="opacity-70">/</span> {task.unit_no}</div>
                                                        <div className="text-line-2 auto-text">{task.site_name}</div>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                    
                                    {/* 📍 [ข้อ 3.2] ปุ่มขยายงานที่ซ่อนอยู่ */}
                                    {hiddenCount > 0 && !isExpanded && (
                                        <div className="view-more-btn" onClick={(e) => toggleExpand(e, cellKey)}>
                                            +อีก {hiddenCount} รายการ
                                        </div>
                                    )}
                                    {isExpanded && (
                                        <div className="view-more-btn" style={{backgroundColor: '#e2e8f0'}} onClick={(e) => toggleExpand(e, cellKey)}>
                                            ^ ย่อเก็บ
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
});
