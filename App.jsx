                                                        {logsLimit < filteredLogs.length && (
                                                            <button onClick={() => {
                                                                setLogsLimit(prev => prev + 20);
                                                                // 🚀 [ข้อ 4] สั่งดึงข้อมูลประวัติจาก Server ต่อท้าย
                                                                fetchAdminData(logsLimit, 20, 'logs');
                                                            }} className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs mt-2 hover:bg-blue-100 transition-all">
                                                                โหลดประวัติเพิ่มเติม... ({logsLimit} / {filteredLogs.length})
                                                            </button>
                                                        )}
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

                    <button className="btn-icon relative" onClick={() => { setShowActivityModal(true); if(!hasLoadedAdmin) fetchAdminData(0, 50, 'all'); }}>
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
                                                            <button onClick={() => { setAreaSelection(h.area || ''); setJobTypeSelection(h.job_type || ''); setProductLineSelection(h.product_line || ''); setModal({ type: 'booking', data: h }); setActionMenuId(null); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
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
                                                    <div><b>ผู้ตรวจ:</b> {h.inspector_name || '-'}</div><div><b>พื้นที่:</b> {h.area || '-'}</div>
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

                            <button onClick={() => setAdminTab('special_management')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-amber-400 transition-all col-span-2">
                                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><Icons.Clock /></div>
                                <span className="font-bold text-amber-800 text-sm text-center">จัดการวันกิจกรรม/วันลา/วันหยุด</span>
                            </button>

                            <button onClick={() => setAdminTab('all_bookings')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 hover:border-slate-400 transition-all col-span-2">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"><Icons.List /></div>
                                <span className="font-bold text-slate-700 text-sm text-center">งานทั้งหมดในระบบ</span>
                            </button>
                        </div>
                    )}

                    {adminTab === 'special_management' && (
                        <div className="animate-pop pb-10 space-y-4">
                            
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-200 mb-6">
                                <h3 className="text-lg font-bold text-blue-900 mb-3 border-b border-blue-100 pb-2 flex items-center gap-2"><Icons.Book /> คู่มือ: ระบบจัดการกิจกรรม / วันลา / วันหยุด</h3>
                                <ul className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
                                    <li><b>การเพิ่ม:</b> กดเข้าหมวดหมู่ที่ต้องการ เลือกวันที่เริ่มต้น-สิ้นสุด ➡️ ระบบจะสร้างการ์ดลงตารางให้อัตโนมัติ (ใส่ <b>เวลา</b> หรือไม่ก็ได้)</li>
                                    <li><b>การลบ:</b> ติ๊ก <span className="bg-red-600 text-white px-1 rounded text-xs inline-block">Checkbox</span> หน้าหลายๆ รายการพร้อมกัน แล้วกดปุ่มลบทิ้งในครั้งเดียวด้านบน</li>
                                    <li><b>การแก้ไข:</b> กดไอคอน <span className="bg-blue-100 text-blue-600 px-1 rounded inline-block text-xs"><Icons.Edit /></span> ด้านหลังรายการแต่ละอัน เพื่อแก้ไขข้อมูลแทนการลบทิ้ง</li>
                                    <li><b>Drag & Drop (ลบทันใจ):</b> สามารถลากการ์ดจากหน้าตาราง มาทิ้งที่ <b>ไอคอนถังขยะมุมซ้ายล่าง</b> ของหน้าจอหลักได้เลย</li>
                                </ul>
                            </div>

                            <button onClick={() => setModal({ type: 'manage_leaves' })} className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-amber-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0"><Icons.User /></div>
                                <span className="font-bold text-amber-800 text-sm text-left flex-1">จัดการวันลา (เพิ่ม / แก้ไข / ลบ)</span>
                                <Icons.ChevronRight />
                            </button>

                            <button onClick={() => setModal({ type: 'manage_events' })} className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-emerald-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0"><Icons.Star /></div>
                                <span className="font-bold text-emerald-800 text-sm text-left flex-1">จัดการกิจกรรมบริษัท (เพิ่ม / แก้ไข / ลบ)</span>
                                <Icons.ChevronRight />
                            </button>

                            <button onClick={() => setModal({ type: 'manage_holidays' })} className="w-full p-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 hover:border-red-400 transition-all">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0"><Icons.CalendarX /></div>
                                <span className="font-bold text-red-800 text-sm text-left flex-1">จัดการวันหยุดบริษัท (เพิ่ม / แก้ไข / ลบ)</span>
                                <Icons.ChevronRight />
                            </button>
                        </div>
                    )}

                    {adminTab === 'inspectors' && (
                        <div className="animate-pop space-y-4 pb-10">
                            
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-200 mb-4">
                                <h3 className="font-bold text-indigo-900 mb-2 border-b border-indigo-100 pb-2 flex items-center gap-2"><Icons.Book /> คู่มือ: จัดการผู้ตรวจ & Certificate</h3>
                                <ul className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                                    <li><b>เพิ่มรายชื่อ:</b> ระบุชื่อ และ <u className="font-bold">ติ๊กเลือก Product Line</u> ที่บุคคลนี้ได้รับอนุญาตให้ตรวจงาน</li>
                                    <li><b>สำคัญมาก:</b> หาก <u className="text-red-500 font-bold">ไม่ติ๊กเลือกรายการใดเลย</u> ระบบจะให้สิทธิ์ตั้งต้นเฉพาะ <b>ES1, 3300</b> และ <b>S-villas</b> เท่านั้น</li>
                                    <li><b>แก้ไข/ลบ:</b> กดไอคอนแก้ไข (สีฟ้า) หรือไอคอนถังขยะ (สีแดง) ท้ายรายชื่อด้านล่าง</li>
                                </ul>
                            </div>

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
                                    <label className="text-xs font-bold text-indigo-700 mb-1 block">ชื่อผู้ตรวจ</label>
                                    <input type="text" name="ins_name" defaultValue={editInspector?.name || ''} required placeholder="ระบุชื่อผู้ตรวจ..." className="w-full text-sm p-3 rounded-lg border border-indigo-200 outline-none mb-4 font-bold bg-white" />
                                    
                                    <label className="text-xs font-bold text-indigo-700 mb-1 block">ใบเซอร์ / Product Line ที่อนุญาตให้ตรวจ</label>
                                    <p className="text-[10px] text-indigo-500 mb-2">* หากไม่ติ๊กเลือกเลย ระบบจะกำหนดสิทธิ์เริ่มต้นให้เป็น <b>ES1, 3300</b> และ <b>S-villas</b> เท่านั้น</p>
                                    <div className="grid grid-cols-2 gap-2 mb-4 bg-white p-3 rounded-lg border border-indigo-100 max-h-40 overflow-y-auto custom-scrollbar">
                                        {Object.keys(PRODUCT_COLORS).filter(k => k !== 'อื่นๆโปรดระบุ').map(pl => (
                                            <label key={pl} className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer p-1 hover:bg-slate-50 rounded">
                                                <input type="checkbox" name="certs" value={pl} defaultChecked={editInspector?.product_lines?.includes(pl)} className="accent-indigo-600 w-4 h-4" />
                                                {pl}
                                            </label>
                                        ))}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {editInspector && <button type="button" onClick={() => setEditInspector(null)} className="flex-1 py-3 bg-slate-100 border border-slate-300 text-slate-700 font-bold rounded-lg shadow-sm active:scale-95">ยกเลิก</button>}
                                        <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md active:scale-95">{editInspector ? 'บันทึกการแก้ไข' : 'ยืนยันเพิ่มผู้ตรวจ'}</button>
                                    </div>
                                </form>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                <h3 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">รายชื่อผู้ตรวจปัจจุบัน</h3>
                                <div className="space-y-2">
                                    {(db.inspectors || []).map((ins, i) => (
                                        <div key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <div>
                                                <div className="font-bold text-slate-800">{ins.name}</div>
                                                <div className="text-[10px] text-slate-500 mt-1 max-w-[220px] break-words leading-tight">
                                                    <span className="font-bold text-indigo-500">สิทธิ์:</span> {ins.product_lines || 'ES1, 3300, S-villas (ค่าเริ่มต้น)'}
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

                    {adminTab === 'all_bookings' && (
                        <div className="space-y-3 mt-4 animate-pop">
                            {!hasLoadedAdmin ? <div className="text-center text-slate-400 p-4"><Icons.Loader /> กำลังโหลด...</div> : 
                            (adminDb.all_bookings || []).length === 0 ? <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl">ไม่มีข้อมูล</div> :
                            <>
                                {(adminDb.all_bookings || []).slice(0, adminBookingsLimit).map((h, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <button onClick={() => setActionMenuId(actionMenuId === h.id ? null : h.id)} className="text-slate-400 hover:text-slate-800 p-1 bg-slate-50 rounded-md border"><Icons.MoreVertical /></button>
                                            {actionMenuId === h.id && (
                                                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden text-xs">
                                                    <button onClick={() => { setAreaSelection(h.area || ''); setJobTypeSelection(h.job_type || ''); setProductLineSelection(h.product_line || ''); setModal({ type: 'booking', data: h }); setActionMenuId(null); setAdminTab('menu'); }} className="w-full text-left px-4 py-3 hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-2">✏️ แก้ไขข้อมูล</button>
                                                    <button onClick={() => handleCancelBooking(h)} className="w-full text-left px-4 py-3 hover:bg-red-50 font-bold text-red-600 border-t border-slate-100 flex items-center gap-2">🗑️ ลบข้อมูล</button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="cursor-pointer pr-10" onClick={() => { setModal({ type: 'detail', data: h }); setAdminTab('menu'); }}>
                                            <div className="font-bold text-slate-800 text-sm mb-1 pr-6">{h.site_name || '-'}</div>
                                            <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? formatSafeDate(h.date) : '-'}</div>
                                            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                                                <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                <div><b>ผู้ตรวจ:</b> {h.inspector_name || '-'}</div><div><b>ประเภท:</b> {h.job_type || '-'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {adminBookingsLimit < (adminDb.all_bookings || []).length && (
                                    <button onClick={() => {
                                        setAdminBookingsLimit(prev => prev + 20);
                                        // 🚀 [ข้อ 4] สั่งดึงข้อมูลจาก Server ต่อท้าย (Pagination)
                                        fetchAdminData(adminBookingsLimit, 20, 'bookings');
                                    }} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                        โหลดเพิ่มเติม ({adminBookingsLimit} / {(adminDb.all_bookings || []).length})
                                    </button>
                                )}
                            </>
                            }
                        </div>
                    )}

                    {adminTab === 'users' && (
                        <div className="space-y-3 mt-4 animate-pop">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200 mb-4">
                                <h3 className="font-bold text-blue-900 mb-2 border-b border-blue-100 pb-2 flex items-center gap-2"><Icons.Book /> คู่มือ: จัดการผู้ใช้งาน</h3>
                                <ul className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                                    <li>ตรวจสอบรายชื่อพนักงานทั้งหมดในระบบ</li>
                                    <li>ป้ายกำกับ <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-1 rounded font-bold">อนุมัติแล้ว</span> หมายถึงสามารถล็อกอินใช้งานระบบได้</li>
                                </ul>
                            </div>

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
                </div>
            )}
            {/* 📍 MODALS & DIALOGS */}
            {modal && (
                <div className="backdrop z-[100] p-4 flex items-center justify-center">
                    
                    {modal?.type === 'admin_cell_action' && (
                        <div className="modal-card p-6 text-center animate-pop w-full max-w-sm bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 transition-all"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-2 border-b border-slate-100 pb-3 leading-tight">จองคิวตรวจ SAIS / เพิ่มรายการกิจกรรม-วันลา-วันหยุด</h3>
                            <p className="text-sm text-slate-500 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">วันที่: <span className="font-bold text-blue-600">{modal.data.date}</span><br/>ผู้ตรวจ: <span className="font-bold text-blue-600">{modal.data.inspector_name}</span></p>
                            
                            <div className="space-y-3">
                                <button onClick={() => { 
                                    setAreaSelection('');
                                    setJobTypeSelection(''); 
                                    setProductLineSelection(''); 
                                    setModal({ type: 'booking', data: modal.data }); 
                                }} className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.Plus /> จองคิวตรวจ SAIS
                                </button>
                                <button onClick={() => { 
                                    setEventStartDate(modal.data.date);
                                    setEventEndDate(modal.data.date);
                                    setEventInspector('ALL');
                                    setModal({ type: 'manage_events' }); 
                                }} className="w-full py-3.5 bg-emerald-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.Star /> เพิ่มกิจกรรม
                                </button>
                                <button onClick={() => { 
                                    setLeaveStartDate(modal.data.date);
                                    setLeaveEndDate(modal.data.date);
                                    setLeaveInspector(modal.data.inspector_name);
                                    setModal({ type: 'manage_leaves' }); 
                                }} className="w-full py-3.5 bg-amber-500 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.User /> จองวันลา
                                </button>
                                <button onClick={() => { 
                                    setHolidayStartDate(modal.data.date);
                                    setHolidayEndDate(modal.data.date);
                                    setModal({ type: 'manage_holidays' }); 
                                }} className="w-full py-3.5 bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2">
                                    <Icons.CalendarX /> เพิ่มวันหยุดนักขัตฤกษ์
                                </button>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'detail' && (
                        <div className="modal-card p-6 w-full max-w-md animate-pop bg-white rounded-3xl shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95 transition-all"><Icons.X /></button>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">รายละเอียดรายการ</h3>
                            
                            <div className="space-y-3 text-sm text-slate-700 mb-6">
                                <div><span className="text-slate-400 text-xs block">วันที่</span><span className="font-bold">{modal.data.date ? formatSafeDate(modal.data.date) : '-'}</span></div>
                                <div><span className="text-slate-400 text-xs block">ผู้ตรวจ</span><span className="font-bold">{modal.data.inspector_name === 'SYSTEM_HOLIDAY' || modal.data.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : modal.data.inspector_name}</span></div>
                                <div><span className="text-slate-400 text-xs block">ชื่อรายการ / โครงการ</span><span className="font-bold">{modal.data.site_name}</span></div>
                                
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
                                        
                                        <div className="grid grid-cols-1 gap-2 mt-2">
                                            <div>
                                                <span className="text-slate-400 text-xs block mb-1">Product Line</span>
                                                <span className={`font-bold text-white px-3 py-1 rounded-lg inline-block shadow-sm ${PRODUCT_COLORS[modal.data.product_line] || 'bg-slate-500'}`}>
                                                    {modal.data.product_line || 'ไม่ระบุ'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-slate-100">
                                            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1"><Icons.FileCheck /> สถานะการส่งเอกสาร</h4>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${String(modal.data.layout_doc) === 'true' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    <div className="text-[10px] mb-1">Layout</div>
                                                    <div className="text-xs font-bold">{String(modal.data.layout_doc) === 'true' ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                </div>
                                                
                                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${String(modal.data.wiring_doc) === 'true' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    <div className="text-[10px] mb-1">Wiring</div>
                                                    <div className="text-xs font-bold">{String(modal.data.wiring_doc) === 'true' ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                </div>
                                                
                                                <div className={`flex flex-col items-center justify-center p-2 rounded-xl border ${String(modal.data.precheck_doc) === 'true' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                                    <div className="text-[10px] mb-1">Precheck</div>
                                                    <div className="text-xs font-bold">{String(modal.data.precheck_doc) === 'true' ? '✅ ส่งแล้ว' : '⏳ รอส่ง'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                
                                {modal.data.map_link && (
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <h4 className="text-xs font-bold text-slate-700 mb-2">📍 แผนที่ (Google Maps)</h4>
                                        <iframe src={utils.getMapEmbedUrl(modal.data.map_link)} className="w-full h-48 rounded-xl border border-slate-200 bg-slate-50" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>
                                        <a href={modal.data.map_link} target="_blank" className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 hover:bg-blue-100 transition-all w-full justify-center">
                                            เปิดนำทางในแอป Google Maps
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* 📍 ปุ่มจัดการข้อมูล ย้ายมารวมในหน้า Detail (สำหรับคนที่มีสิทธิ์) */}
                            {(isAdmin || user?.username === modal.data.created_by) && (
                                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-3">
                                    <button onClick={() => {
                                        const isSpecial = String(modal.data.job_type).includes('leave') || String(modal.data.job_type).includes('event') || String(modal.data.job_type).includes('holiday');
                                        if(isSpecial) {
                                            setModal({ type: 'edit_special', data: modal.data });
                                        } else {
                                            setAreaSelection(modal.data.area || '');
                                            setJobTypeSelection(modal.data.job_type || ''); 
                                            setProductLineSelection(modal.data.product_line || ''); 
                                            setModal({ type: 'booking', data: modal.data });
                                        }
                                    }} className="py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                                        <Icons.Edit /> แก้ไขข้อมูล
                                    </button>

                                    <button onClick={() => handleCancelBooking(modal.data)} className="py-3 bg-red-50 text-red-700 font-bold rounded-xl border border-red-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2">
                                        <Icons.Trash /> ลบรายการนี้
                                    </button>

                                    {/* เพิ่มคิวงานในวันนี้ (เฉพาะแอดมินและไม่ใช่วันหยุด/ลา) */}
                                    {isAdmin && !String(modal.data.job_type).includes('leave') && !String(modal.data.job_type).includes('event') && !String(modal.data.job_type).includes('holiday') && (
                                        <button onClick={() => {
                                            setAreaSelection('');
                                            setJobTypeSelection(''); 
                                            setProductLineSelection(''); 
                                            setModal({ 
                                                type: 'booking', 
                                                data: { date: formatSafeDate(modal.data.date), inspector_name: modal.data.inspector_name } 
                                            });
                                        }} className="py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-200 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 mt-2">
                                            <Icons.Plus /> เพิ่มคิวงานในวันนี้ (Admin)
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                    {modal?.type === 'edit_special' && (
                        <div className="modal-card p-6 w-full max-w-sm bg-white rounded-3xl shadow-2xl animate-pop relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-100 text-slate-500 p-2 rounded-full hover:bg-slate-200 active:scale-95"><Icons.X /></button>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">✏️ แก้ไขข้อมูลพิเศษ</h3>
                            <form onSubmit={handleEditSpecialSubmit} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">เปลี่ยนวันที่</label>
                                    <input type="date" name="date" defaultValue={modal.data?.date ? formatSafeDate(modal.data.date) : ''} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold text-blue-600" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ผู้ตรวจ</label>
                                    <select name="inspector_name" defaultValue={modal.data?.inspector_name} className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none font-bold">
                                        <option value="SYSTEM_EVENT">✅ ทุกคน (กิจกรรมรวม)</option>
                                        <option value="SYSTEM_HOLIDAY">✅ ทุกคน (วันหยุดรวม)</option>
                                        {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>👤 เฉพาะ: {i.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อรายการ (รวมถึงเวลา)</label>
                                    <input type="text" name="site_name" defaultValue={modal.data?.site_name} required className="w-full text-sm p-3 rounded-lg border border-slate-300 outline-none" />
                                </div>
                                <button disabled={loadingMsg} className="w-full py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-md transition-all active:scale-95">บันทึกการแก้ไข</button>
                            </form>
                        </div>
                    )}

                    {modal?.type === 'booking' && (
                        <div className="modal-card w-full max-w-[450px] animate-pop flex flex-col max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl relative">
                            <button onClick={() => setModal(null)} className="absolute top-4 right-4 bg-slate-200 text-slate-500 hover:bg-slate-300 p-2 rounded-full z-50"><Icons.X /></button>
                            
                            <div className="p-4 border-b border-slate-100 bg-slate-50">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <Icons.FileCheck /> {modal.data.id ? '✏️ แก้ไขคิวงาน' : '📝 จองคิวงานใหม่'}
                                </h3>
                            </div>

                            <div className="p-5 overflow-y-auto max-h-[75vh] custom-scrollbar">
                                {(() => {
                                    // 1.) คำนวณสิทธิ์ใบเซอร์ Product Line ตาม Inspector ที่เลือก
                                    let allowedCerts = ['ES1', '3300', 'S-villas'];
                                    if (modal?.data?.inspector_name) {
                                        const inspectorObj = (db.inspectors || []).find(i => i.name === modal.data.inspector_name);
                                        if (inspectorObj && inspectorObj.product_lines && inspectorObj.product_lines.trim() !== '') {
                                            allowedCerts = inspectorObj.product_lines.split(',').map(s => s.trim());
                                        }
                                    }
                                    if (!allowedCerts.includes('อื่นๆโปรดระบุ')) allowedCerts.push('อื่นๆโปรดระบุ');

                                    return (
                                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                                            
                                            {isAdmin && modal.data.id && (
                                                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                                                    <h4 className="text-xs font-bold text-amber-800 mb-2 border-b border-amber-200 pb-1">⚙️ [Admin] แก้ไขวันที่/ผู้ตรวจ</h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div>
                                                            <label className="text-[10px] font-bold text-amber-700">แก้ไขวันที่</label>
                                                            <input type="date" name="admin_date_target" defaultValue={modal.data.date ? formatSafeDate(modal.data.date) : ''} className="w-full text-sm p-2 rounded-lg border border-amber-300 outline-none" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-bold text-amber-700">ย้ายผู้ตรวจ</label>
                                                            <select name="admin_inspector_target" defaultValue={modal.data.inspector_name} className="w-full text-sm p-2 rounded-lg border border-amber-300 outline-none font-bold">
                                                                {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <input type="hidden" name="isAdminOverride" value="true" />
                                                </div>
                                            )}

                                            {!isAdmin && (
                                                <div className="flex gap-2">
                                                    <div className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-200"><span className="text-[10px] text-slate-500 block">วันที่จอง</span><span className="font-bold text-slate-800 text-sm">{formatSafeDate(modal.data.date)}</span></div>
                                                    <div className="flex-1 bg-slate-50 p-2 rounded-lg border border-slate-200"><span className="text-[10px] text-slate-500 block">ผู้ตรวจ</span><span className="font-bold text-blue-600 text-sm">{modal.data.inspector_name}</span></div>
                                                </div>
                                            )}
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">Product Line <span className="text-red-500">*</span></label>
                                                    <select name="product_line" value={productLineSelection} onChange={e => setProductLineSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                        <option value="" disabled>--เลือก--</option>
                                                        {allowedCerts.map(cert => (
                                                            <option key={cert} value={cert}>{cert}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-700 mb-1 block">ประเภทงาน <span className="text-red-500">*</span></label>
                                                    <select name="job_type" value={jobTypeSelection} onChange={e => setJobTypeSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                        <option value="" disabled>--เลือก--</option>
                                                        <option value="New">New</option>
                                                        <option value="MOD">MOD</option>
                                                        <option value="Re-ins temporary power supply">Re-ins temporary</option>
                                                        <option value="Re-ins builder lift">Re-ins builder lift</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {productLineSelection === 'อื่นๆโปรดระบุ' && <div><input type="text" name="custom_product_line" required placeholder="โปรดระบุ Product Line..." className="w-full text-sm p-2.5 rounded-lg bg-yellow-50 border border-yellow-300" defaultValue={modal.data.product_line} /></div>}

                                            <div><label className="text-xs font-bold text-slate-700 mb-1 block">พื้นที่ <span className="text-red-500">*</span></label>
                                            <select name="area" value={areaSelection} onChange={e => setAreaSelection(e.target.value)} required className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none bg-white">
                                                <option value="" disabled>--เลือก--</option>
                                                <option value="กรุงเทพและปริมณฑล">กรุงเทพและปริมณฑล</option>
                                                <option value="other">ต่างจังหวัด (โปรดระบุ)</option>
                                            </select></div>
                                            {areaSelection === 'other' && <div><input type="text" name="custom_area" required placeholder="ระบุจังหวัด..." className="w-full text-sm p-2.5 rounded-lg bg-pink-50 border border-pink-300" defaultValue={modal.data.area} /></div>}

                                            <div className="grid grid-cols-2 gap-3">
                                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">Eq No. <span className="text-red-500">*</span></label><input type="text" name="equipment_no" required placeholder="เช่น 51123456" defaultValue={modal.data.equipment_no} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                                <div><label className="text-xs font-bold text-slate-700 mb-1 block">Unit No. {!isAdmin && <span className="text-red-500">*</span>}</label><input type="text" name="unit_no" required={!isAdmin} placeholder="เช่น L1, E2" defaultValue={modal.data.unit_no} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                            </div>

                                            <div><label className="text-xs font-bold text-slate-700 mb-1 block">ชื่อโครงการ <span className="text-red-500">*</span></label><input type="text" name="site_name" required placeholder="ระบุชื่อโครงการ" defaultValue={modal.data.site_name ? modal.data.site_name.replace(/^\d{2}:\d{2}-\d{2}:\d{2}\s/, '') : ''} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" /></div>
                                            
                                            {isAdmin && (
                                                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                                    <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่มงาน (ไม่บังคับ)</label><input type="time" name="job_start_time" className="w-full text-sm p-2 border border-slate-300 rounded-lg outline-none" defaultValue={modal.data.site_name ? (modal.data.site_name.match(/^(\d{2}:\d{2})-\d{2}:\d{2}/) ? modal.data.site_name.match(/^(\d{2}:\d{2})-\d{2}:\d{2}/)[1] : '') : ''} /></div>
                                                    <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเลิกงาน (ไม่บังคับ)</label><input type="time" name="job_end_time" className="w-full text-sm p-2 border border-slate-300 rounded-lg outline-none" defaultValue={modal.data.site_name ? (modal.data.site_name.match(/^\d{2}:\d{2}-(\d{2}:\d{2})/) ? modal.data.site_name.match(/^\d{2}:\d{2}-(\d{2}:\d{2})/)[1] : '') : ''} /></div>
                                                </div>
                                            )}

                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1 block">เบอร์โทรศัพท์ติดต่อ <span className="text-slate-400 font-normal">(ไม่ต้องใส่ขีด -)</span> {!isAdmin && <span className="text-red-500">*</span>}</label>
                                                <input type="tel" name="tel" required={!isAdmin} maxLength="10" placeholder="08XXXXXXXX" defaultValue={modal.data.tel} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }} />
                                            </div>

                                            <div>
                                                <label className="text-xs font-bold text-slate-700 mb-1 block">Google Maps Link <span className="text-slate-400 font-normal">(ตัวเลือก)</span></label>
                                                <input type="text" name="map_link" placeholder="วางลิงก์ Google Maps ที่นี่" defaultValue={modal.data.map_link} className="w-full text-sm p-2.5 rounded-lg border border-slate-300 outline-none" onChange={(e) => handleMapChange(e.target.value)} />
                                                {liveMapUrl && <iframe src={liveMapUrl} className="map-preview mt-2 w-full h-48 rounded-xl border border-slate-200 bg-slate-50" allowFullScreen loading="lazy" referrerPolicy="no-referrer"></iframe>}
                                            </div>

                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mt-4">
                                                <h4 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 flex items-center gap-2"><Icons.Upload /> อัปโหลดเอกสารแนบ (รูปภาพ)</h4>
                                                
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                        <div className="flex-1"><label className="text-xs font-bold text-slate-700 block">1. Layout</label><input type="hidden" name="layout_img" id="layout_img_input" defaultValue={modal.data.layout_img} /></div>
                                                        <div className="flex items-center gap-2">
                                                            {modal.data.layout_img && <a href={modal.data.layout_img} target="_blank" className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded">ดูไฟล์</a>}
                                                            <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700">{uploadingDoc.layout ? 'กำลังอัปโหลด...' : 'เลือกรูป'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'layout')} disabled={uploadingDoc.layout} /></label>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                        <div className="flex-1"><label className="text-xs font-bold text-slate-700 block">2. Wiring</label><input type="hidden" name="wiring_img" id="wiring_img_input" defaultValue={modal.data.wiring_img} /></div>
                                                        <div className="flex items-center gap-2">
                                                            {modal.data.wiring_img && <a href={modal.data.wiring_img} target="_blank" className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded">ดูไฟล์</a>}
                                                            <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700">{uploadingDoc.wiring ? 'กำลังอัปโหลด...' : 'เลือกรูป'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'wiring')} disabled={uploadingDoc.wiring} /></label>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg border border-slate-200">
                                                        <div className="flex-1"><label className="text-xs font-bold text-slate-700 block">3. Pre-check</label><input type="hidden" name="precheck_img" id="precheck_img_input" defaultValue={modal.data.precheck_img} /></div>
                                                        <div className="flex items-center gap-2">
                                                            {modal.data.precheck_img && <a href={modal.data.precheck_img} target="_blank" className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded">ดูไฟล์</a>}
                                                            <label className="bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700">{uploadingDoc.precheck ? 'กำลังอัปโหลด...' : 'เลือกรูป'}<input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'precheck')} disabled={uploadingDoc.precheck} /></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {isAdmin && (
                                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 mt-4">
                                                    <h4 className="text-sm font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2 flex items-center gap-2"><Icons.Shield /> สำหรับ Admin ตรวจเอกสาร</h4>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <label className="admin-check-item flex flex-col items-center justify-center p-2 bg-white rounded-lg border cursor-pointer hover:bg-slate-50"><input type="checkbox" name="layout_doc" defaultChecked={String(modal.data.layout_doc) === 'true'} /> <span className="text-xs mt-1 font-bold text-slate-700">Layout</span></label>
                                                        <label className="admin-check-item flex flex-col items-center justify-center p-2 bg-white rounded-lg border cursor-pointer hover:bg-slate-50"><input type="checkbox" name="wiring_doc" defaultChecked={String(modal.data.wiring_doc) === 'true'} /> <span className="text-xs mt-1 font-bold text-slate-700">Wiring</span></label>
                                                        <label className="admin-check-item flex flex-col items-center justify-center p-2 bg-white rounded-lg border cursor-pointer hover:bg-slate-50"><input type="checkbox" name="precheck_doc" defaultChecked={String(modal.data.precheck_doc) === 'true'} /> <span className="text-xs mt-1 font-bold text-slate-700">Precheck</span></label>
                                                    </div>
                                                </div>
                                            )}

                                            {isAdmin && !modal.data.id && (
                                                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 mt-4 flex items-center gap-3">
                                                    <input type="checkbox" id="keep_open" name="keep_open" className="w-5 h-5 accent-emerald-600 cursor-pointer" />
                                                    <label htmlFor="keep_open" className="text-sm font-bold text-emerald-800 cursor-pointer select-none">
                                                        จองคิวงานต่อเนื่อง <span className="text-xs font-normal">(ไม่ปิดหน้าต่างนี้)</span>
                                                    </label>
                                                </div>
                                            )}

                                            <button disabled={loadingMsg || uploadingDoc.layout || uploadingDoc.wiring || uploadingDoc.precheck} className="w-full py-3.5 rounded-xl font-bold text-white bg-red-600 shadow-md mt-6 active:scale-95 transition-all text-sm">
                                                {loadingMsg ? 'กำลังบันทึก...' : (modal.data.id ? 'บันทึกการแก้ไข' : 'ยืนยันการจองคิว')}
                                            </button>
                                        </form>
                                    );
                                })()}
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_leaves' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-amber-500 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.User /> จัดการวันลา</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มวันลาใหม่</h4>
                                    <div className="space-y-3">
                                        <select className="w-full p-2.5 text-sm border rounded-lg bg-slate-50 font-bold" value={leaveInspector} onChange={(e) => setLeaveInspector(e.target.value)}>
                                            <option value="">-- เลือกพนักงาน --</option>
                                            {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                        </select>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={leaveStartDate} onChange={(e) => setLeaveStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={leaveEndDate} onChange={(e) => setLeaveEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่ม (ถ้ามี)</label><input type="time" value={leaveStartTime} onChange={(e) => setLeaveStartTime(e.target.value)} className="w-full p-2 border rounded-lg text-xs" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาสิ้นสุด (ถ้ามี)</label><input type="time" value={leaveEndTime} onChange={(e) => setLeaveEndTime(e.target.value)} className="w-full p-2 border rounded-lg text-xs" /></div>
                                        </div>
                                        <select className="w-full p-2.5 text-sm border rounded-lg" value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                            <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลากิจ">ลากิจ</option><option value="ลาป่วย">ลาป่วย</option><option value="อื่นๆโปรดระบุ">อื่นๆ (ระบุเอง)</option>
                                        </select>
                                        {leaveType === 'อื่นๆโปรดระบุ' && <input type="text" placeholder="ระบุประเภทการลา..." value={customLeaveType} onChange={(e) => setCustomLeaveType(e.target.value)} className="w-full p-2.5 border rounded-lg text-sm bg-amber-50" />}
                                        <button onClick={async () => {
                                            if(!leaveInspector || !leaveStartDate || !leaveEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ');
                                            if(leaveStartDate > leaveEndDate) return setAlertMsg('วันที่เริ่มต้องไม่มากกว่าวันสิ้นสุด');
                                            let finalType = leaveType === 'อื่นๆโปรดระบุ' ? customLeaveType : leaveType;
                                            if(leaveStartTime && leaveEndTime) finalType = `${leaveStartTime}-${leaveEndTime} ${finalType}`;
                                            const logDetail = `[เพิ่มวันลา (กลุ่ม)]\nโดย: ${user?.username}\nพนักงาน: ${leaveInspector}\nประเภท: ${finalType}\nตั้งแต่วันที่: ${leaveStartDate} ถึง ${leaveEndDate}`;
                                            const ok = await apiAction({ action: 'create_multiple_bookings', dates: leaveDates, inspector_name: leaveInspector, job_type: 'leave', site_name: finalType, equipment_no: `LEAVE_${Date.now()}`, user: user.username, reason: logDetail }, 'กำลังสร้างวันลา...');
                                            if(ok) { setSuccessModal(`เพิ่มวันลาสำเร็จ ${leaveDates.length} วัน`); setLeaveStartDate(''); setLeaveEndDate(''); setLeaveStartTime(''); setLeaveEndTime(''); }
                                        }} className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl active:scale-95 shadow-md flex justify-center items-center gap-2"><Icons.Plus /> เพิ่มวันลา ({leaveDates.length} วัน)</button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                    <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-slate-700 text-sm">รายการวันลาทั้งหมด</h4>{selectedLeavesToDelete.length > 0 && <button onClick={() => handleBulkDelete('leave', selectedLeavesToDelete)} className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">ลบที่เลือก ({selectedLeavesToDelete.length})</button>}</div>
                                    <div className="space-y-2">
                                        {(db.bookings || []).filter(b => b.job_type === 'leave' || String(b.equipment_no).startsWith('LEAVE_')).map(l => (
                                            <div key={l.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="w-4 h-4 accent-amber-500" checked={selectedLeavesToDelete.includes(l.id)} onChange={(e) => setSelectedLeavesToDelete(prev => e.target.checked ? [...prev, l.id] : prev.filter(id => id !== l.id))} />
                                                    <div><div className="font-bold text-slate-800 text-xs">{l.inspector_name}</div><div className="text-[10px] text-amber-600">{formatSafeDate(l.date)} • {l.site_name}</div></div>
                                                </div>
                                                <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_leaves' })} className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Icons.Edit /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_events' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-emerald-500 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.Star /> จัดการกิจกรรม</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มกิจกรรมใหม่</h4>
                                    <div className="space-y-3">
                                        <input type="text" id="event_name_input" placeholder="ชื่อกิจกรรม..." className="w-full p-2.5 text-sm border rounded-lg font-bold" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={eventStartDate} onChange={(e) => setEventStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={eventEndDate} onChange={(e) => setEventEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาเริ่ม (ถ้ามี)</label><input type="time" value={eventStartTime} onChange={(e) => setEventStartTime(e.target.value)} className="w-full p-2 border rounded-lg text-xs" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">เวลาสิ้นสุด (ถ้ามี)</label><input type="time" value={eventEndTime} onChange={(e) => setEventEndTime(e.target.value)} className="w-full p-2 border rounded-lg text-xs" /></div>
                                        </div>
                                        
                                        <select 
                                            className="w-full p-2.5 text-sm border rounded-lg bg-slate-50 font-bold" 
                                            value={eventInspector} 
                                            onChange={(e) => setEventInspector(e.target.value)}
                                        >
                                            <option value="ALL">ทุกคน (SYSTEM_EVENT)</option>
                                            {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                        </select>

                                        <button onClick={async () => {
                                            const eName = document.getElementById('event_name_input').value;
                                            if(!eName || !eventStartDate || !eventEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ');
                                            
                                            let finalName = eName; 
                                            if(eventStartTime && eventEndTime) finalName = `${eventStartTime}-${eventEndTime} ${eName}`;
                                            
                                            // 📍 รับค่าจาก Dropdown (ถ้าเป็น ALL ให้ใช้ SYSTEM_EVENT)
                                            const target = eventInspector === 'ALL' ? 'SYSTEM_EVENT' : eventInspector;
                                            
                                            setLoadingMsg('กำลังสร้างกิจกรรม...');
                                            
                                            const logDetail = `[เพิ่มกิจกรรม]\nโดย: ${user?.username}\nชื่อ: ${finalName}\nผู้เข้าร่วม: ${target}\nตั้งแต่วันที่: ${eventStartDate} ถึง ${eventEndDate}`;
                                            const payload = { 
                                                action: 'create_multiple_bookings', 
                                                dates: eventDates, 
                                                inspector_name: target, 
                                                job_type: 'company_event', 
                                                site_name: finalName, 
                                                equipment_no: `EVENT_${Date.now()}`, 
                                                user: user.username, 
                                                reason: logDetail 
                                            };
                                            
                                            const res = await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
                                            setLoadingMsg(null);
                                            
                                            if(res.status === 'ok') { 
                                                setSuccessModal(`สร้างกิจกรรมสำเร็จ ${eventDates.length} รายการ`); 
                                                setEventStartDate(''); 
                                                setEventEndDate(''); 
                                                setEventStartTime(''); 
                                                setEventEndTime(''); 
                                                document.getElementById('event_name_input').value = ''; 
                                                await fetchCoreData(true, null); 
                                            } else {
                                                setAlertMsg('มีบางรายการไม่สำเร็จ');
                                            }
                                        }} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl active:scale-95 shadow-md flex justify-center items-center gap-2">
                                            <Icons.Plus /> สร้างกิจกรรม
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                    <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-slate-700 text-sm">รายการกิจกรรมทั้งหมด</h4>{selectedEventsToDelete.length > 0 && <button onClick={() => handleBulkDelete('event', selectedEventsToDelete)} className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">ลบที่เลือก ({selectedEventsToDelete.length})</button>}</div>
                                    <div className="space-y-2">
                                        {(db.bookings || []).filter(b => b.inspector_name === 'SYSTEM_EVENT' || String(b.equipment_no).startsWith('EVENT_')).map(l => (
                                            <div key={l.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="w-4 h-4 accent-emerald-500" checked={selectedEventsToDelete.includes(l.id)} onChange={(e) => setSelectedEventsToDelete(prev => e.target.checked ? [...prev, l.id] : prev.filter(id => id !== l.id))} />
                                                    <div><div className="font-bold text-slate-800 text-xs">{l.site_name}</div><div className="text-[10px] text-emerald-600">{formatSafeDate(l.date)} • {l.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : l.inspector_name}</div></div>
                                                </div>
                                                <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_events' })} className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Icons.Edit /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {modal?.type === 'manage_holidays' && (
                        <div className="modal-card w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-pop flex flex-col max-h-[90vh] bg-white">
                            <div className="bg-red-600 p-4 text-white flex justify-between items-center"><h3 className="font-bold flex items-center gap-2"><Icons.CalendarX /> จัดการวันหยุด</h3><button onClick={() => setModal(null)} className="bg-white/20 p-1.5 rounded-full hover:bg-white/30"><Icons.X /></button></div>
                            <div className="p-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50 space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                    <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"><Icons.Plus /> เพิ่มวันหยุดใหม่</h4>
                                    <div className="space-y-3">
                                        <input type="text" id="holiday_name_input" placeholder="ชื่อวันหยุด..." className="w-full p-2.5 text-sm border rounded-lg font-bold" />
                                        <div className="grid grid-cols-2 gap-2">
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันที่เริ่ม</label><input type="date" value={holidayStartDate} onChange={(e) => setHolidayStartDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                            <div><label className="text-[10px] font-bold text-slate-500 mb-1 block">วันสิ้นสุด</label><input type="date" value={holidayEndDate} onChange={(e) => setHolidayEndDate(e.target.value)} className="w-full p-2 border rounded-lg text-xs font-bold" /></div>
                                        </div>
                                        <button onClick={async () => {
                                            const hName = document.getElementById('holiday_name_input').value;
                                            if(!hName || !holidayStartDate || !holidayEndDate) return setAlertMsg('กรุณากรอกข้อมูลให้ครบ');
                                            const logDetail = `[เพิ่มวันหยุด]\nโดย: ${user?.username}\nชื่อวันหยุด: ${hName}\nตั้งแต่วันที่: ${holidayStartDate} ถึง ${holidayEndDate}`;
                                            const ok = await apiAction({ action: 'create_multiple_bookings', dates: holidayDates, inspector_name: 'SYSTEM_HOLIDAY', job_type: 'public_holiday', site_name: hName, equipment_no: `HLD_${Date.now()}`, user: user.username, reason: logDetail }, 'กำลังสร้างวันหยุด...');
                                            if(ok) { setSuccessModal(`สร้างวันหยุดสำเร็จ ${holidayDates.length} วัน`); setHolidayStartDate(''); setHolidayEndDate(''); document.getElementById('holiday_name_input').value = ''; }
                                        }} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl active:scale-95 shadow-md flex justify-center items-center gap-2"><Icons.Plus /> กำหนดวันหยุด ({holidayDates.length} วัน)</button>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mt-4">
                                    <div className="flex justify-between items-center mb-3"><h4 className="font-bold text-slate-700 text-sm">รายการวันหยุดทั้งหมด</h4>{selectedHolidaysToDelete.length > 0 && <button onClick={() => handleBulkDelete('holiday', selectedHolidaysToDelete)} className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg font-bold">ลบที่เลือก ({selectedHolidaysToDelete.length})</button>}</div>
                                    <div className="space-y-2">
                                        {(db.bookings || []).filter(b => b.inspector_name === 'SYSTEM_HOLIDAY' || String(b.equipment_no).startsWith('HLD_')).map(l => (
                                            <div key={l.id} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" className="w-4 h-4 accent-red-600" checked={selectedHolidaysToDelete.includes(l.id)} onChange={(e) => setSelectedHolidaysToDelete(prev => e.target.checked ? [...prev, l.id] : prev.filter(id => id !== l.id))} />
                                                    <div><div className="font-bold text-slate-800 text-xs">{l.site_name}</div><div className="text-[10px] text-red-600">{formatSafeDate(l.date)}</div></div>
                                                </div>
                                                <button onClick={() => setModal({ type: 'edit_special', data: l, returnTo: 'manage_holidays' })} className="p-1.5 bg-blue-50 text-blue-600 rounded-md"><Icons.Edit /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Basic Dialogs (Alert, Confirm, Prompt, etc.) */}
            {alertMsg && (
                <div className="backdrop z-[500] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl animate-pop">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                        <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl active:scale-95 shadow-md">ตกลง</button>
                    </div>
                </div>
            )}
            {confirmDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยันการทำรายการ</h3>
                        <div className="text-sm text-slate-600 mb-6 whitespace-pre-line">{confirmDialog.msg}</div>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm active:scale-95">ยกเลิก</button>
                            <button onClick={confirmDialog.onConfirm} className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl shadow-md active:scale-95">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}
            {promptDialog && (
                <div className="backdrop z-[600] p-4 flex items-center justify-center">
                    <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-pop">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ระบุเหตุผล</h3>
                        <p className="text-xs text-slate-500 mb-4">{promptDialog.msg}</p>
                        <input type="text" id="prompt_input" className="w-full p-3 border rounded-xl mb-4 bg-slate-50 font-bold text-sm" placeholder="พิมพ์เหตุผล..." autoFocus />
                        <div className="flex gap-3">
                            <button onClick={() => setPromptDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl shadow-sm active:scale-95">ยกเลิก</button>
                            <button onClick={() => { const v = document.getElementById('prompt_input').value; if(!v) return setAlertMsg('กรุณาระบุเหตุผล'); promptDialog.onSubmit(v); }} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 📍 Notification & History Modal */}
            {showActivityModal && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6 h-[85vh] flex flex-col">
                        <button onClick={() => setShowActivityModal(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2 flex-shrink-0">ศูนย์แจ้งเตือนและประวัติ</h3>
                        
                        {!hasLoadedAdmin && activityTab === 'logs' ? (
                             <div className="flex flex-col items-center justify-center p-10 text-slate-400 gap-4 flex-1">
                                  <Icons.Loader /> กำลังดึงประวัติระบบ...
                             </div>
                        ) : (
                            <>
                                <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg flex-shrink-0">
                                    <button onClick={() => setActivityTab('notif')} className={`flex-1 py-2 text-xs font-bold rounded-md ${activityTab === 'notif' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>การแจ้งเตือน</button>
                                    <button onClick={() => { setActivityTab('logs'); if(!hasLoadedAdmin) fetchAdminData(0, 50, 'logs'); }} className={`flex-1 py-2 text-xs font-bold rounded-md ${activityTab === 'logs' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>Audit Trail (ประวัติ)</button>
                                </div>

                                {activityTab === 'logs' && (
                                    <div className="mb-3 flex-shrink-0">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"><Icons.Search /></div>
                                            <input type="text" placeholder="ค้นหา หัวข้อโครงการ หรือ ผู้ทำการ..." 
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-400 font-bold text-slate-700"
                                                value={logSearchQuery} onChange={(e) => setLogSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="overflow-y-auto flex-1 pr-2 space-y-3 custom-scrollbar">
                                    {activityTab === 'notif' && (
                                        <>
                                            {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN') || (!user && n.target === 'ALL')).map((n, i) => (
                                                <div key={i} onClick={() => markNotifAsRead(n.id)} className={`p-3 rounded-xl border cursor-pointer transition-all ${String(n.isRead) === 'true' ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-blue-50 border-blue-200 shadow-sm'}`}>
                                                    <div className="text-xs font-bold text-slate-800">{n.message}</div>
                                                    <div className="text-[9px] text-slate-400 mt-1 text-right">{new Date(n.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</div>
                                                </div>
                                            ))}
                                            {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN') || (!user && n.target === 'ALL')).length === 0 && <p className="text-center text-slate-400 text-sm py-10">ไม่มีข้อความใหม่</p>}
                                        </>
                                    )}
                                    
                                    {activityTab === 'logs' && (
                                        <>
                                            {(() => {
                                                const filteredLogs = (adminDb.logs || []).filter(log => {
                                                    if (!logSearchQuery) return true;
                                                    const q = logSearchQuery.toLowerCase();
                                                    return String(log.user || '').toLowerCase().includes(q) || 
                                                           String(log.action || '').toLowerCase().includes(q) || 
                                                           String(log.details || '').toLowerCase().includes(q);
                                                }).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
                                                if (filteredLogs.length === 0) return <div className="text-center text-slate-400 text-sm py-10">ไม่พบประวัติที่ค้นหา</div>;
                                                return (
                                                    <>
                                                        {filteredLogs.slice(0, logsLimit).map((log, i) => (
                                                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Icons.User /></div>
                                                                        <div className="text-[10px] font-bold text-slate-700">{log.user}</div>
                                                                    </div>
                                                                    <div className="text-[9px] text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                                        {new Date(log.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                                    </div>
                                                                </div>
                                                            
                                                                <div className="mb-2">
                                                                    <span className={`px-2 py-1 rounded-md text-[9px] font-bold inline-block
                                                                          ${String(log.action).includes('CREATE') || String(log.action).includes('เพิ่ม') ? 'bg-green-100 text-green-700' : 
                                                                          String(log.action).includes('UPDATE') || String(log.action).includes('แก้ไข') ? 'bg-blue-100 text-blue-700' : 
                                                                          String(log.action).includes('DELETE') || String(log.action).includes('ลบ') ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                                                                        {log.action}
                                                                    </span>
                                                                </div>

                                                                <div className="text-[11px] font-mono text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                                    {log.details}
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {logsLimit < filteredLogs.length && (
                                                            <button onClick={() => {
                                                                setLogsLimit(prev => prev + 20);
                                                                // 🚀 [ข้อ 4] สั่งดึงข้อมูลประวัติจาก Server ต่อท้าย
                                                                fetchAdminData(logsLimit, 20, 'logs');
                                                            }} className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl text-xs mt-2 hover:bg-blue-100 transition-all">
                                                                โหลดประวัติเพิ่มเติม... ({logsLimit} / {filteredLogs.length})
                                                            </button>
                                                        )}
                                                    </>
                                                );
                                            })()}
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
               </div>
            )}

            {/* 📍 Login & Register Modal */}
            {showLogin && (
                <div className="backdrop z-[250]">
                    <div className="modal-card p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-red-500"></div>
                        <button onClick={() => { setShowLogin(false); setIsRegisterMode(false); setIsForgotMode(false); }} className="btn-close-modern"><Icons.X /></button>
                        
                        <div className="text-center mb-8 pt-4">
                            <div className="mb-4">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">SAIS</h1>
                                <h2 className="text-xs font-bold text-red-600 uppercase tracking-widest mt-1">Schedule Booking System</h2>
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{isForgotMode ? 'รีเซ็ตรหัสผ่าน' : (isRegisterMode ? 'สมัครสมาชิกใหม่' : 'เข้าสู่ระบบ')}</h2>
                        </div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const fd = new FormData(e.target);
                            
                            if (isForgotMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านใหม่ไม่ตรงกัน');
                                const payload = { 
                                    action: 'reset_password', 
                                    username: fd.get('username'), 
                                    full_name: fd.get('full_name'), 
                                    phone: fd.get('phone'),
                                    new_password: fd.get('password')
                                };
                                const res = await apiAction(payload, 'กำลังรีเซ็ตรหัสผ่าน...');
                                if (res) { 
                                    setSuccessModal('เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบใหม่');
                                    setIsForgotMode(false); 
                                }
                            } 
                            else if (isRegisterMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านไม่ตรงกัน');
                                const payload = { 
                                    action: 'register', 
                                    username: fd.get('username'), 
                                    password: fd.get('password'),
                                    full_name: fd.get('full_name'), 
                                    department: fd.get('department'), 
                                    position: fd.get('position'), 
                                    email: fd.get('email'), 
                                    phone: fd.get('phone')
                                };
                                const res = await apiAction(payload, 'กำลังส่งข้อมูลสมัครสมาชิก...');
                                if (res) { setSuccessModal('สมัครสำเร็จ รอแอดมินอนุมัติ'); setIsRegisterMode(false); }
                            } 
                            else {
                                setLoadingMsg('กำลังตรวจสอบข้อมูล...');
                                try {
                                    const result = await utils.fetchWithRetry(SCRIPT_URL, { 
                                        method: 'POST', 
                                        body: JSON.stringify({ action: 'login', username: fd.get('username'), password: fd.get('password') }) 
                                    });
                                    setLoadingMsg(null);
                                    if (result.status === 'ok') { 
                                        localStorage.setItem('sais_user', JSON.stringify(result.user));
                                        localStorage.setItem('sais_session_time', Date.now().toString());
                                        setUser(result.user); 
                                        setShowLogin(false); 
                                        setSuccessModal('เข้าสู่ระบบสำเร็จ'); 
                                    } else {
                                        setAlertMsg(result.message || 'รหัสผ่านไม่ถูกต้อง');
                                    }
                                } catch (err) { 
                                    setLoadingMsg(null);
                                    setAlertMsg('การเชื่อมต่อขัดข้อง หรือเซิร์ฟเวอร์ไม่ตอบสนอง');
                                }
                            }
                        }} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            
                            {isForgotMode ? (
                                <div className="space-y-3 pb-2 border-b border-slate-100">
                                    <div><label className="text-[10px] font-bold text-slate-500">Username</label><input name="username" required placeholder="ระบุ Username ของคุณ" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                    <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล (ที่ใช้สมัคร)</label><input name="full_name" required placeholder="ระบุชื่อ-นามสกุล" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                    <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์ (ที่ใช้สมัคร)</label><input type="tel" name="phone" required placeholder="08XXXXXXXX" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                </div>
                            ) : isRegisterMode && (
                                <div className="space-y-3 pb-2 border-b border-slate-100">
                                    <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล</label><input name="full_name" required placeholder="ระบุชื่อ-นามสกุล" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">แผนก</label><input name="department" required placeholder="เช่น NI , MOD" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ตำแหน่ง</label><input name="position" required placeholder="เช่น PE,PM" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">อีเมล</label><input type="email" name="email" required placeholder="@schindler.com" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์</label><input type="tel" name="phone" required placeholder="08XXXXXXXX" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm" /></div>
                                    </div>
                                </div>
                            )}
                            
                            {!isForgotMode && (
                                <div><label className="text-[10px] font-bold text-slate-500">Username (ใช้ล็อกอิน)</label><input name="username" required placeholder="Username" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm font-bold" /></div>
                            )}
                            
                            <div className="relative">
                                <label className="text-[10px] font-bold text-slate-500">{isForgotMode ? 'ตั้งรหัสผ่านใหม่' : 'Password'}</label>
                                <input name="password" type={showPassword ? "text" : "password"} required placeholder={isForgotMode ? "New Password" : "Password"} className="bg-slate-50 pr-12 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm font-bold" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[26px] text-slate-400 p-1 hover:bg-slate-200 rounded-full">{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                            </div>
                            
                            {(isRegisterMode || isForgotMode) && (
                                <div><label className="text-[10px] font-bold text-slate-500">ยืนยันรหัสผ่านอีกครั้ง</label><input name="confirm_password" type={showPassword ? "text" : "password"} required placeholder="Confirm Password" className="bg-slate-50 w-full p-2.5 rounded-lg outline-none border border-slate-200 text-sm font-bold" /></div>
                            )}

                            <button disabled={loadingMsg} className="w-full py-3.5 rounded-xl text-white font-bold bg-red-600 mt-4 shadow-md active:scale-95 transition-all text-sm">
                                {loadingMsg ? 'รอสักครู่...' : (isForgotMode ? 'ยืนยันการเปลี่ยนรหัสผ่าน' : (isRegisterMode ? 'ส่งข้อมูลสมัครสมาชิก' : 'LOGIN'))}
                            </button>
                            
                            <div className="text-center mt-4">
                                {!isForgotMode && !isRegisterMode && (
                                    <>
                                        <button type="button" onClick={() => setIsForgotMode(true)} className="text-xs font-bold text-red-500 hover:underline mb-3 block w-full">ลืมรหัสผ่าน?</button>
                                        <button type="button" onClick={() => setIsRegisterMode(true)} className="text-xs font-bold text-blue-600 hover:underline block w-full">ยังไม่มีบัญชี? สมัครสมาชิกที่นี่</button>
                                    </>
                                )}
                                {(isRegisterMode || isForgotMode) && (
                                    <button type="button" onClick={() => { setIsRegisterMode(false); setIsForgotMode(false); }} className="text-xs font-bold text-slate-500 hover:underline">กลับไปหน้าเข้าสู่ระบบ</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

// 📍 Error Boundary (ดักจับข้อผิดพลาดไม่ให้จอขาว)
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
                    <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95">รีเฟรชหน้าเว็บ</button>
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

