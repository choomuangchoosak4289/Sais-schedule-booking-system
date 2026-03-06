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
    MapPin: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    Clock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    FileCheck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><polyline points="9 15 11 17 16 12"/></svg>,
    MessageSquare: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    Home: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    Shield: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>,
    EyeOff: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>,
    Download: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    CalendarX: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><line x1="10" y1="14" x2="14" y2="18"></line><line x1="14" y1="14" x2="10" y2="18"></line></svg>,
    Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
    History: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><polyline points="12 7 12 12 15 15"></polyline></svg>,
    Upload: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
    Chart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
};

const PRODUCT_COLORS = {
    'ES1,3300': 'bg-blue-500', '5500': 'bg-emerald-500', 'ES5/ES5.1': 'bg-purple-500',
    'S-villas': 'bg-amber-500', 'ES2': 'bg-pink-500', 'ES3': 'bg-indigo-500',
    'MOR-R': 'bg-rose-500', 'S7R4': 'bg-cyan-500', '7000': 'bg-teal-600', 'อื่นๆโปรดระบุ': 'bg-slate-500'
};

const App = () => {
    const SCRIPT_URL = window.SAIS_CONFIG.SCRIPT_URL;
    const ADMIN_USERNAME = window.SAIS_CONFIG.ADMIN_USERNAME;
    const utils = window.SAIS_UTILS;

    const [db, setDb] = useState({ bookings: [], users: [], logs: [], notifications: [], inspectors: [] });
    const [user, setUser] = useState(() => { try { const saved = localStorage.getItem('sais_user'); return saved ? JSON.parse(saved) : null; } catch(e) { return null; } });
    
    const [initialLoad, setInitialLoad] = useState(true);
    const [loading, setLoading] = useState(false);
    const [uploadingDoc, setUploadingDoc] = useState({ layout: false, wiring: false, precheck: false });

    const [myBookingsLimit, setMyBookingsLimit] = useState(20);
    const [adminBookingsLimit, setAdminBookingsLimit] = useState(20);
    const [logsLimit, setLogsLimit] = useState(20);

    const [currentView, setCurrentView] = useState('calendar');
    const [modal, setModal] = useState(null); 
    const [showLogin, setShowLogin] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false); 
    const [showPassword, setShowPassword] = useState(false); 
    
    const [showLogs, setShowLogs] = useState(false);
    const [showNotifs, setShowNotifs] = useState(false);
    const [showManual, setShowManual] = useState(false);
    
    const [alertMsg, setAlertMsg] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState(null);
    const [toast, setToast] = useState(null);
    
    const [currentDate, setCurrentDate] = useState(new Date());
    const [period, setPeriod] = useState(new Date().getDate() > 15 ? 1 : 0); 
    const [areaSelection, setAreaSelection] = useState('กรุงเทพและปริมณฑล');
    const [jobTypeSelection, setJobTypeSelection] = useState('New');
    const [productLineSelection, setProductLineSelection] = useState('ES1,3300');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [filterArea, setFilterArea] = useState('All');
    const [filterJobType, setFilterJobType] = useState('All');
    
    const [adminTab, setAdminTab] = useState('menu'); 
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

    const isAdmin = useMemo(() => user?.username === ADMIN_USERNAME || user?.role === 'admin', [user]);
    const unreadNotifs = useMemo(() => (db.notifications || []).filter(n => (n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')) && String(n.isRead) !== 'true'), [db.notifications, user, isAdmin]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('sais_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('sais_user');
        }
    }, [user]);

    useEffect(() => {
        const load = async () => { await fetchData(); setInitialLoad(false); }
        load();
        const timer = setInterval(() => { if (!modal && !showLogin && !showLogs && !showNotifs && !alertMsg) fetchData(); }, 180000); 
        return () => clearInterval(timer);
    }, [modal, showLogin, showLogs, showNotifs, alertMsg]);

    const fetchData = async () => {
        if (!SCRIPT_URL) return;
        try {
            const data = await utils.fetchWithRetry(SCRIPT_URL, { method: 'GET' });
            if (data) setDb({ bookings: data.bookings || [], users: data.users || [], logs: data.logs || [], notifications: data.notifications || [], inspectors: data.inspectors || [] });
        } catch (e) { console.error("Fetch Error"); }
    };

    const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

    const handleLogout = () => {
        setConfirmDialog({
            msg: 'ยืนยันการออกจากระบบใช่หรือไม่?',
            onConfirm: async () => {
                setConfirmDialog(null);
                setLoading(true);
                setUser(null);

                try {
                    localStorage.clear();
                    sessionStorage.clear();

                    if (window.DB_CACHE) await window.DB_CACHE.clear();
                    if (window.DB_QUEUE) await window.DB_QUEUE.clear();

                    if ('caches' in window) {
                        const cacheNames = await caches.keys();
                        await Promise.all(cacheNames.map(name => caches.delete(name)));
                    }
                    
                    if ('serviceWorker' in navigator) {
                        const registrations = await navigator.serviceWorker.getRegistrations();
                        for (let registration of registrations) {
                            await registration.unregister();
                        }
                    }
                } catch (error) {
                    console.error("Logout cleanup error:", error);
                } finally {
                    window.location.replace(window.location.pathname + '?logout=' + new Date().getTime());
                }
            }
        });
    };

    const promptConfirm = (message, onConfirmCallback) => {
        if (window.confirm(message)) {
            onConfirmCallback();
        }
    };

    const apiAction = async (payload) => {
        setLoading(true);
        try {
            const result = await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
            setLoading(false);
            if (result.status === 'ok') { await fetchData(); return true; } 
            else { setAlertMsg(result.message || 'ไม่ทราบสาเหตุ'); return false; }
        } catch (e) { setLoading(false); setAlertMsg('การเชื่อมต่อขัดข้อง'); return false; }
    };

    const markNotifAsRead = async (id) => {
        setDb(prev => ({ ...prev, notifications: prev.notifications.map(n => n.id === id ? {...n, isRead: 'true'} : n) }));
        fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'read_notification', id: id }) });
    };

    const handleImageUpload = async (e, docType) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return setAlertMsg('กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น');
        
        setUploadingDoc(prev => ({ ...prev, [docType]: true }));
        try {
            const base64Img = await utils.compressImage(file);
            const res = await utils.fetchWithRetry(SCRIPT_URL, {
                method: 'POST', 
                body: JSON.stringify({ action: 'upload_image', base64: base64Img, mimeType: file.type, fileName: `SAIS_${docType}_${Date.now()}.jpg` })
            });
            if (res.status === 'ok') {
                document.getElementById(`${docType}_img_input`).value = res.fileUrl;
                showToast(`อัปโหลดเอกสาร ${docType} สำเร็จ`, 'success');
            } else { setAlertMsg('อัปโหลดไม่สำเร็จ'); }
        } catch(err) { setAlertMsg('เกิดข้อผิดพลาดในการอัปโหลด'); }
        setUploadingDoc(prev => ({ ...prev, [docType]: false }));
    };

    const handleDragStart = (e, taskId) => { e.dataTransfer.setData('taskId', taskId); };
    const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
    const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };
    const handleDrop = async (e, targetDate, targetInspector) => {
        e.preventDefault(); e.currentTarget.classList.remove('drag-over');
        if (!isAdmin) return showToast('เฉพาะแอดมินที่ย้ายคิวได้', 'alert');
        const taskId = e.dataTransfer.getData('taskId');
        const task = db.bookings.find(b => String(b.id) === String(taskId));
        if(!task) return;
        const isDup = db.bookings.some(b => String(b.date).split('T')[0] === targetDate && String(b.inspector_name) === targetInspector && b.id !== taskId);
        if(isDup) return setAlertMsg('ช่องนี้มีคิวงานอยู่แล้ว');

        promptConfirm(`ย้ายคิว Eq:${task.equipment_no} ไปยัง ${targetInspector} วันที่ ${targetDate}?`, async () => {
            const ok = await apiAction({ action: 'update_booking', id: taskId, date: targetDate, inspector_name: targetInspector, user: user.username });
            if(ok) showToast('ย้ายคิวสำเร็จ');
        });
    };

    const handleMapChange = async (val) => {
        if (!val) { setLiveMapUrl(''); return; }
        const parsedUrl = utils.getMapEmbedUrl(val);
        if (parsedUrl) { setLiveMapUrl(parsedUrl); return; }
    };
    useEffect(() => { if (modal && modal.type === 'booking') handleMapChange(modal.data.map_link || ''); else setLiveMapUrl(''); }, [modal]);

    const changePeriod = (dir) => {
        let newDate = new Date(currentDate);
        if (dir === 'next') { if (period === 0) setPeriod(1); else { setPeriod(0); newDate.setMonth(newDate.getMonth() + 1); setCurrentDate(newDate); } } 
        else { if (period === 1) setPeriod(0); else { setPeriod(1); newDate.setMonth(newDate.getMonth() - 1); setCurrentDate(newDate); } }
    };

    const todayLocalString = utils.getLocalDateString(new Date());
    const filteredBookings = useMemo(() => {
        return (db.bookings || []).filter(b => {
            const searchStr = String(searchQuery || '').toLowerCase();
            const matchSearch = String(b.equipment_no || '').toLowerCase().includes(searchStr) || String(b.site_name || '').toLowerCase().includes(searchStr) || String(b.foreman || '').toLowerCase().includes(searchStr);
            const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
            const matchJobType = filterJobType === 'All' ? true : String(b.job_type || '') === filterJobType;
            return matchSearch && matchArea && matchJobType;
        });
    }, [db.bookings, searchQuery, filterArea, filterJobType]);

    const daysInView = useMemo(() => {
        const year = currentDate.getFullYear(); const month = currentDate.getMonth(); const lastDay = new Date(year, month + 1, 0).getDate();
        const start = period === 0 ? 1 : 16; const end = period === 0 ? 15 : lastDay; const days = [];
        for (let i = 0; i < 16; i++) {
            const d = start + i;
            if (d <= end) {
                const date = new Date(year, month, d); const localDateStr = utils.getLocalDateString(date);
                const holidayRecord = (db.bookings || []).find(b => b.date && String(b.date).split('T')[0] === localDateStr && String(b.inspector_name) === 'SYSTEM_HOLIDAY');
                days.push({ full: localDateStr, day: d, weekday: date.toLocaleDateString('en-US', { weekday: 'short' }), isSunday: date.getDay() === 0, isHoliday: !!holidayRecord || date.getDay() === 0, holidayData: holidayRecord || null, isToday: localDateStr === todayLocalString, isEmpty: false });
            } else { days.push({ isEmpty: true }); }
        }
        return days;
    }, [currentDate, period, db.bookings]);

    const handleBookingSubmit = async (e) => {
        e.preventDefault(); const fd = new FormData(e.target); const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        if (!/^\d{10}$/.test(data.tel)) return setAlertMsg('กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : areaSelection;
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : productLineSelection;

        const isDup = (db.bookings || []).some(b => b.date && String(b.date).split('T')[0] === modal.data.date && String(b.equipment_no) === String(data.equipment_no) && b.id !== modal.data.id && String(b.inspector_name) !== 'SYSTEM_HOLIDAY');
        if (isDup) return setAlertMsg(`เลข Eq No. ${data.equipment_no} ถูกจองไปแล้วในวันนี้`);

        const payload = {
            action: modal.data.id ? 'update_booking' : 'create_booking',
            ...data, tel: String(data.tel), area: finalArea, job_type: jobTypeSelection, product_line: finalProductLine,
            id: modal.data.id, inspector_name: modal.data.inspector_name, date: modal.data.date, user: user.username,
            layout_img: fd.get('layout_img') || modal.data.layout_img || '',
            wiring_img: fd.get('wiring_img') || modal.data.wiring_img || '',
            precheck_img: fd.get('precheck_img') || modal.data.precheck_img || ''
        };

        if (isAdmin) { payload.layout_doc = data.layout_doc ? 'true' : 'false'; payload.wiring_doc = data.wiring_doc ? 'true' : 'false'; payload.precheck_doc = data.precheck_doc ? 'true' : 'false'; } 
        else if (modal.data.id) { payload.layout_doc = String(modal.data.layout_doc || 'false'); payload.wiring_doc = String(modal.data.wiring_doc || 'false'); payload.precheck_doc = String(modal.data.precheck_doc || 'false'); } 
        else { payload.layout_doc = 'false'; payload.wiring_doc = 'false'; payload.precheck_doc = 'false'; }

        const ok = await apiAction(payload);
        if (ok) { setModal(null); setAreaSelection('กรุงเทพและปริมณฑล'); setJobTypeSelection('New'); setProductLineSelection('ES1,3300'); setLiveMapUrl(''); showToast(modal.data.id ? 'อัปเดตข้อมูลสำเร็จ!' : 'บันทึกสำเร็จ!', 'success'); }
    };

    return (
        <div className="app-container">
            {toast && <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-full shadow-2xl bg-white flex items-center gap-3 animate-pop font-bold text-sm border ${toast.type === 'alert' ? 'border-amber-400 text-amber-600' : 'border-green-400 text-green-600'}`}>{toast.type === 'success' ? <Icons.Check /> : <Icons.Alert />} {toast.msg}</div>}

            <header className={`main-header ${user ? 'bg-slate-800' : 'bg-red-600'}`}>
                <div className="flex items-center gap-2"><h1 className="text-xl font-bold tracking-wide">SAIS BOOKING</h1></div>
                <div className="flex items-center gap-2">
                    
                    <button className="btn-icon" onClick={() => setShowManual(true)} title="คู่มือการใช้งาน"><Icons.Book /></button>
                    
                    {user && (
                        <>
                            <button className="btn-icon" onClick={() => setShowLogs(true)} title="ประวัติการทำงาน"><Icons.History /></button>
                            <button className="btn-icon" onClick={() => setShowNotifs(true)}>
                                <Icons.Bell />
                                {unreadNotifs.length > 0 && <span className="notif-dot"></span>}
                            </button>
                        </>
                    )}
                    
                    {!user ? <button className="ml-1 bg-white text-red-700 px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm" onClick={() => setShowLogin(true)}>LOGIN <Icons.User /></button>
                           : <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.User /> {user.username}</div>}
                </div>
            </header>

            <div className="bottom-nav">
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => setCurrentView('calendar')}><Icons.Home /> ปฏิทินจอง</div>
                <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => { if(!user) setShowLogin(true); else setCurrentView('my_bookings'); }}><Icons.List /> งานของฉัน</div>
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { setCurrentView('admin'); setAdminTab('menu'); }}><Icons.Shield /> Admin</div>}
                {user && <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>}
            </div>

            {currentView === 'calendar' && (
                <div className="grid-container">
                    <div className="filter-bar">
                        <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2 flex-1 shadow-sm">
                            <div className="text-slate-400"><Icons.Search /></div>
                            <input type="text" placeholder="ค้นหา Eq..." className="w-full text-xs p-2 outline-none border-none bg-transparent" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            {searchQuery && <button onClick={() => setSearchQuery('')} className="text-slate-400 p-1"><Icons.X /></button>}
                        </div>
                        <select className="text-xs border border-slate-300 rounded-lg p-2 bg-white outline-none w-24 shadow-sm font-bold text-slate-600" value={filterArea} onChange={(e) => setFilterArea(e.target.value)}>
                            <option value="All">ทุกพื้นที่</option><option value="กรุงเทพและปริมณฑล">กทม.</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option>
                        </select>
                    </div>

                    <div className="nav-bar bg-white px-3 py-2 border-b">
                        <div className="flex justify-between items-center w-full">
                            <button onClick={() => changePeriod('prev')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1"><Icons.ChevronLeft /> ย้อนกลับ</button>
                            <div className="text-center font-bold text-slate-800 text-sm">{period === 0 ? "1-15 " : `16-${new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()} `}{currentDate.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}</div>
                            <button onClick={() => changePeriod('next')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">ถัดไป <Icons.ChevronRight /></button>
                        </div>
                    </div>
                    
                    <div className="grid-wrapper" ref={scrollRef}>
                        {initialLoad ? (
                            <div className="w-full h-full flex flex-col p-4 gap-2">
                                {[1,2,3,4,5,6].map(i => <div key={i} className="w-full h-16 skeleton rounded-lg"></div>)}
                            </div>
                        ) : (
                            <div className="calendar-grid" style={{ '--col-count': (db.inspectors || []).length || 1 }}>
                                <div className="sticky-corner text-[10px] font-bold">DATE</div>
                                {(db.inspectors || []).map((ins, i) => (
                                    <div key={i} className="sticky-top">
                                        <div className="font-bold truncate w-full text-center px-1 text-[11px]">{ins.name || '-'}</div>
                                        <div className="text-[9px] font-bold uppercase text-slate-300">{ins.short || String(ins.name || '').substring(0,3)}</div>
                                    </div>
                                ))}

                                {daysInView.map((d, index) => {
                                    let headerClass = '';
                                    if (d.isSunday || (d.holidayData && d.holidayData.job_type === 'public_holiday')) headerClass = 'is-sunday-col';
                                    else if (d.holidayData && d.holidayData.job_type === 'company_event') headerClass = 'is-company-event-col';

                                    return (
                                        <React.Fragment key={index}>
                                            <div className={`sticky-left ${headerClass} ${d.isToday ? 'is-today-row' : ''}`}>
                                                {!d.isEmpty && (<><span className="leading-none font-bold text-sm">{d.day}</span><span className="text-[9px] mt-0.5 font-bold uppercase opacity-80">{d.weekday}</span></>)}
                                            </div>
                                            
                                            {!d.isEmpty && (db.inspectors || []).map((ins, idx) => {
                                                const task = filteredBookings.find(b => b.date && String(b.date).split('T')[0] === d.full && String(b.inspector_name) === String(ins.name));
                                                const hasTask = !!task && String(task.inspector_name) !== 'SYSTEM_HOLIDAY';
                                                
                                                let cellHolidayClass = '';
                                                if (!hasTask) {
                                                    if (d.isSunday || (d.holidayData && d.holidayData.job_type === 'public_holiday')) cellHolidayClass = 'is-holiday-cell'; 
                                                    else if (d.holidayData && d.holidayData.job_type === 'company_event') cellHolidayClass = 'is-company-event-cell'; 
                                                }

                                                let cardTypeClass = 'card-type-default', areaClass = ''; 
                                                if (hasTask) {
                                                    if (task.job_type === 'temporary power supply') cardTypeClass = 'card-type-temp';
                                                    if (task.job_type === 'builder lift') cardTypeClass = 'card-type-builder';
                                                    areaClass = (task.area && task.area !== 'กรุงเทพและปริมณฑล' && task.area !== 'ไม่ระบุ') ? 'area-upcountry' : 'area-bkk';
                                                }

                                                return (
                                                    <div key={idx} 
                                                        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, d.full, ins.name)}
                                                        className={`grid-cell cursor-pointer hover:bg-slate-50 ${cellHolidayClass} ${d.isToday && !cellHolidayClass ? 'is-today-row' : ''}`}
                                                        onClick={() => {
                                                            if (hasTask) { setModal({ type: 'detail', data: task }); } 
                                                            else {
                                                                if (d.isHoliday && !isAdmin) return setAlertMsg('วันหยุดระบบไม่เปิดให้จองคิวครับ');
                                                                if (!user) return setShowLogin(true);
                                                                if (d.full < todayLocalString && !isAdmin) return setAlertMsg('ไม่สามารถจองคิวงานย้อนหลังได้ครับ');
                                                                setModal({ type: 'booking', data: { date: d.full, inspector_name: ins.name } });
                                                            }
                                                        }}>
                                                        
                                                        {!hasTask && d.isHoliday && (
                                                            <div className="holiday-label-new">{d.holidayData ? d.holidayData.site_name : (d.isSunday ? '' : 'HOLIDAY')}</div>
                                                        )}
                                                        
                                                        {hasTask && (
                                                            <div draggable={isAdmin} onDragStart={(e) => handleDragStart(e, task.id)} className={`task-content ${cardTypeClass} ${areaClass}`}>
                                                                <div className="text-line-1">{task.equipment_no} <span className="font-normal opacity-70">/</span> {task.unit_no}</div>
                                                                <div className="text-line-2">{task.site_name}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {currentView === 'my_bookings' && (
                <div className="page-view">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.List /> งานของฉัน</h2>
                    <div className="space-y-3">
                        {(() => {
                            const myTasks = (db.bookings || []).filter(b => String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && b.created_by === user?.username).sort((a, b) => new Date(b.date) - new Date(a.date));
                            return (
                                <>
                                    {myTasks.slice(0, myBookingsLimit).map((h, i) => (
                                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="font-bold text-slate-800 text-sm">{h.site_name || '-'}</div>
                                                <div className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{h.date ? String(h.date).split('T')[0] : '-'}</div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
                                                <div><b>Eq No:</b> {h.equipment_no || '-'}</div><div><b>Unit:</b> {h.unit_no || '-'}</div>
                                                <div><b>ผู้ตรวจสอบ:</b> {h.inspector_name || '-'}</div><div><b>พื้นที่:</b> {h.area || '-'}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {myBookingsLimit < myTasks.length && (
                                        <button onClick={() => setMyBookingsLimit(prev => prev + 20)} className="w-full py-3 bg-slate-200 text-slate-700 font-bold rounded-xl mt-4 active:scale-95 transition-all">
                                            โหลดรายการเพิ่มเติม... ({myBookingsLimit} / {myTasks.length})
                                        </button>
                                    )}
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {currentView === 'admin' && isAdmin && (
                <div className="page-view">
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Shield /> Admin</h2>
                    </div>

                    {adminTab === 'menu' && (
                        <div className="grid grid-cols-2 gap-4 animate-pop">
                            <button onClick={() => setAdminTab('bookings')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Icons.List /></div>
                                <span className="font-bold text-slate-700 text-sm">จัดการคิวงาน</span>
                            </button>
                            <button onClick={() => setAdminTab('users')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Icons.User /></div>
                                <span className="font-bold text-slate-700 text-sm">จัดการสมาชิก</span>
                            </button>
                            <button onClick={() => setAdminTab('holidays')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center"><Icons.CalendarX /></div>
                                <span className="font-bold text-slate-700 text-sm">วันหยุด/กิจกรรม</span>
                            </button>
                            <button onClick={() => setAdminTab('analytics')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Icons.Chart /></div>
                                <span className="font-bold text-slate-700 text-sm">สถิติ (Analytics)</span>
                            </button>
                            <button onClick={() => utils.exportToCSV(db.bookings)} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 col-span-2">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"><Icons.Download /></div>
                                <span className="font-bold text-slate-700 text-sm">ดาวน์โหลด Excel (CSV)</span>
                            </button>
                        </div>
                    )}

                    {adminTab !== 'menu' && (
                        <button onClick={() => setAdminTab('menu')} className="mb-4 text-xs font-bold text-slate-500 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                            <Icons.ChevronLeft /> เมนูหลัก
                        </button>
                    )}

                    {adminTab === 'analytics' && (
                        <div className="space-y-4 animate-pop">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">🏆 สถิติจำนวนงานตรวจ (แยกตาม Product Line)</h3>
                                <div className="space-y-4">
                                    {(db.inspectors || []).map(ins => {
                                        const insBookings = db.bookings.filter(b => String(b.inspector_name) === String(ins.name) && String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.status) !== 'cancelled');
                                        const total = insBookings.length;
                                        if(total === 0) return null; 
                                        
                                        const productCounts = insBookings.reduce((acc, curr) => {
                                            const pl = curr.product_line && curr.product_line !== '' ? curr.product_line : 'อื่นๆโปรดระบุ';
                                            acc[pl] = (acc[pl] || 0) + 1;
                                            return acc;
                                        }, {});

                                        return (
                                            <div key={ins.name}>
                                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                                                    <span>{ins.name}</span><span>{total} งาน</span>
                                                </div>
                                                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                                    {Object.entries(productCounts).map(([pl, count], idx) => {
                                                        const colorClass = PRODUCT_COLORS[pl] || 'bg-slate-400';
                                                        const percent = (count / total) * 100;
                                                        return (
                                                            <div key={idx} title={`${pl}: ${count} งาน`} className={`h-full ${colorClass} flex items-center justify-center text-[8px] text-white font-bold`} style={{ width: `${percent}%` }}>
                                                                {percent > 10 ? count : ''}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-1.5">
                                                    {Object.entries(productCounts).map(([pl, count], idx) => (
                                                        <div key={idx} className="flex items-center gap-1 text-[9px] text-slate-500">
                                                            <div className={`w-2 h-2 rounded-full ${PRODUCT_COLORS[pl] || 'bg-slate-400'}`}></div>{pl} ({count})
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'bookings' && (
                        <div className="animate-pop">
                            {selectedDocs.length > 0 && (
                                <div className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4 flex justify-between items-center">
                                    <span className="text-sm font-bold text-red-700">เลือกแล้ว {selectedDocs.length} รายการ</span>
                                    <button onClick={handleBatchApprove} disabled={loading} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-md">อนุมัติทั้งหมด</button>
                                </div>
                            )}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs text-slate-600 whitespace-nowrap">
                                        <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                            <tr><th className="p-3 text-center">เลือก</th><th className="p-3">วันที่จอง</th><th className="p-3">Eq No.</th><th className="p-3">โครงการ</th><th className="p-3">ผู้จอง</th><th className="p-3 text-center">เอกสาร</th></tr>
                                        </thead>
                                        <tbody>
                                            {(() => {
                                                const adminTasks = (db.bookings || []).filter(b => String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.status) !== 'cancelled').sort((a, b) => new Date(b.date) - new Date(a.date));
                                                return (
                                                    <>
                                                        {adminTasks.slice(0, adminBookingsLimit).map((h, i) => {
                                                            const docsOk = String(h.layout_doc) === 'true' && String(h.wiring_doc) === 'true' && String(h.precheck_doc) === 'true';
                                                            return (
                                                                <tr key={i} className={`border-b border-slate-100 ${selectedDocs.includes(h.id) ? 'bg-red-50/50' : 'hover:bg-slate-50'}`}>
                                                                    <td className="p-3 text-center">{!docsOk && <input type="checkbox" className="w-4 h-4 accent-red-600" checked={selectedDocs.includes(h.id)} onChange={() => { setSelectedDocs(prev => prev.includes(h.id) ? prev.filter(docId => docId !== h.id) : [...prev, h.id]); }} />}</td>
                                                                    <td className="p-3 cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>{h.date ? String(h.date).split('T')[0] : '-'}</td>
                                                                    <td className="p-3 font-bold text-slate-800 cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>{h.equipment_no}</td>
                                                                    <td className="p-3 truncate max-w-[120px] cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>{h.site_name}</td>
                                                                    <td className="p-3 cursor-pointer">{h.created_by}</td>
                                                                    <td className="p-3 text-center cursor-pointer" onClick={() => setModal({ type: 'detail', data: h })}>{docsOk ? <span className="text-green-600 font-bold">✅ ส่งแล้ว</span> : <span className="text-amber-500 font-bold">⏳ ยังไม่ส่ง</span>}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                        {adminBookingsLimit < adminTasks.length && (
                                                            <tr>
                                                                <td colSpan="6" className="p-4">
                                                                    <button onClick={() => setAdminBookingsLimit(prev => prev + 20)} className="w-full py-2 bg-slate-100 text-slate-600 font-bold rounded-lg text-xs">โหลดเพิ่มเติม... ({adminBookingsLimit} / {adminTasks.length})</button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </>
                                                )
                                            })()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'users' && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pop">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-600 whitespace-nowrap">
                                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                                        <tr><th className="p-3">Username / ชื่อ</th><th className="p-3">แผนก</th><th className="p-3">สิทธิ์</th><th className="p-3 text-center">สถานะ</th><th className="p-3 text-center">จัดการ</th></tr>
                                    </thead>
                                    <tbody>
                                        {(db.users || []).map((u, i) => (
                                            <tr key={i} className="border-b border-slate-100">
                                                <td className="p-3 font-bold text-slate-800">{u.username}<br/><span className="text-[10px] text-slate-500 font-normal">{u.fullname || '-'}</span></td>
                                                <td className="p-3">{u.department || '-'}</td>
                                                <td className="p-3">{u.role === 'admin' ? 'ผู้ดูแล' : 'พนักงาน'}</td>
                                                <td className="p-3 text-center">
                                                    {u.status === 'pending' ? <span className="text-amber-500 font-bold bg-amber-50 px-2 py-1 rounded">รออนุมัติ</span> : 
                                                     u.status === 'approved' ? <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">ใช้งานได้</span> : 
                                                     <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded">ระงับ</span>}
                                                </td>
                                                <td className="p-3 text-center flex justify-center gap-2">
                                                    {u.status === 'pending' && <button onClick={() => promptConfirm('อนุมัติผู้ใช้นี้?', () => apiAction({action: 'update_user_status', admin_user: user.username, target_user: u.username, new_status: 'approved'}))} className="bg-green-500 text-white px-3 py-1 rounded-lg">อนุมัติ</button>}
                                                    {u.status === 'approved' && <button onClick={() => promptConfirm('บล็อกผู้ใช้นี้?', () => apiAction({action: 'update_user_status', admin_user: user.username, target_user: u.username, new_status: 'blocked'}))} className="bg-red-500 text-white px-3 py-1 rounded-lg">บล็อก</button>}
                                                    {u.status === 'blocked' && <button onClick={() => promptConfirm('ปลดบล็อกผู้ใช้นี้?', () => apiAction({action: 'update_user_status', admin_user: user.username, target_user: u.username, new_status: 'approved'}))} className="bg-slate-500 text-white px-3 py-1 rounded-lg">ปลดบล็อก</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {adminTab === 'holidays' && (
                        <div className="animate-pop space-y-4">
                            <form onSubmit={async (e) => {
                                e.preventDefault(); const fd = new FormData(e.target);
                                const ok = await apiAction({ action: 'create_booking', date: fd.get('h_date'), inspector_name: 'SYSTEM_HOLIDAY', job_type: fd.get('h_type'), site_name: fd.get('h_name'), equipment_no: `HLD_${Date.now()}`, user: user.username });
                                if(ok) { showToast('เพิ่มวันหยุดสำเร็จ'); e.target.reset(); }
                            }} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">➕ เพิ่มวันหยุด / กิจกรรมบริษัท</h3>
                                <div className="space-y-3">
                                    <div><label className="text-xs font-bold text-slate-500">วันที่</label><input type="date" name="h_date" required className="bg-slate-50 p-2 rounded-lg border w-full text-sm" /></div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500">ประเภท</label>
                                        <select name="h_type" className="bg-slate-50 p-2 rounded-lg border w-full text-sm font-bold">
                                            <option value="public_holiday">🔴 วันหยุดนักขัตฤกษ์ (สีแดง)</option><option value="company_event">🌸 กิจกรรมบริษัท (สีชมพู)</option>
                                        </select>
                                    </div>
                                    <div><label className="text-xs font-bold text-slate-500">ชื่อวันหยุด / กิจกรรม</label><input type="text" name="h_name" required placeholder="เช่น วันสงกรานต์" className="bg-slate-50 p-2 rounded-lg border w-full text-sm" /></div>
                                    <button disabled={loading} className="w-full bg-slate-800 text-white py-2 rounded-lg font-bold text-sm">บันทึกลงตาราง</button>
                                </div>
                            </form>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">รายการที่ตั้งไว้แล้ว</h3>
                                <div className="space-y-2">
                                    {(db.bookings || []).filter(b => b.date && String(b.inspector_name) === 'SYSTEM_HOLIDAY' && new Date(b.date).getTime() >= new Date().getTime() - 86400000).sort((a,b) => new Date(a.date) - new Date(b.date)).map((h, i) => (
                                        <div key={i} className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                                            <div>
                                                <div className="text-xs font-bold text-slate-800">{String(h.date).split('T')[0]}</div>
                                                <div className="text-[11px] font-bold mt-0.5">{h.job_type === 'company_event' ? <span className="text-pink-600">🌸 {h.site_name}</span> : <span className="text-red-600">🔴 {h.site_name}</span>}</div>
                                            </div>
                                            <button onClick={() => promptConfirm('ลบวันหยุดนี้?', () => apiAction({action: 'delete_booking', id: h.id, user: user.username}))} className="bg-white border border-red-200 text-red-500 p-1.5 rounded shadow-sm"><Icons.X /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {showLogs && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6">
                        <button onClick={() => setShowLogs(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2"><Icons.History /> ประวัติการทำงานในระบบ</h3>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                            {(() => {
                                const logList = db.logs || [];
                                return (
                                    <>
                                        {logList.slice(0, logsLimit).map((log, i) => (
                                            <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
                                                <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                                    <span className="flex items-center gap-1 text-slate-600"><Icons.User /> {log.user}</span>
                                                    <span>{log.timestamp}</span>
                                                </div>
                                                <div className="text-xs font-bold text-slate-800">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] mr-2 ${log.action === 'CREATE' ? 'bg-green-100 text-green-700' : log.action === 'UPDATE' ? 'bg-blue-100 text-blue-700' : log.action === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-700'}`}>
                                                        {log.action}
                                                    </span>
                                                </div>
                                                <div className="text-[11px] mt-2 text-slate-600 leading-relaxed whitespace-pre-wrap border-l-2 border-slate-300 pl-2">
                                                    {log.details}
                                                </div>
                                            </div>
                                        ))}
                                        {logsLimit < logList.length && (
                                            <button onClick={() => setLogsLimit(prev => prev + 20)} className="w-full py-2 bg-slate-200 text-slate-700 font-bold rounded-lg text-xs mt-2">
                                                โหลดประวัติเพิ่มเติม... ({logsLimit} / {logList.length})
                                            </button>
                                        )}
                                        {logList.length === 0 && <p className="text-center text-slate-400 text-sm">ไม่มีประวัติ</p>}
                                    </>
                                )
                            })()}
                        </div>
                    </div>
                </div>
            )}

            {showManual && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6">
                        <button onClick={() => setShowManual(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2"><Icons.Book /> คู่มือการใช้งานระบบ</h3>
                        <div className="text-sm text-slate-700 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1">👨‍💻 สำหรับบุคคลทั่วไป (ไม่ต้องล็อกอิน)</h4>
                                <ul className="list-decimal pl-4 text-xs space-y-2 text-slate-600">
                                    <li>ดูตารางวันว่างของผู้ตรวจสอบแต่ละท่านได้แบบ Real-time</li>
                                    <li>หากต้องการจองคิว ให้กดปุ่ม <b className="text-red-600">LOGIN</b> มุมขวาบน เพื่อเข้าสู่ระบบหรือสมัครสมาชิก</li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-1">📋 สำหรับพนักงาน (การจองคิวตรวจ)</h4>
                                <ul className="list-decimal pl-4 text-xs space-y-2 text-blue-800">
                                    <li><b>การจอง:</b> แตะที่ <b className="text-red-600">ช่องว่างสีขาว</b> ให้ตรงกับวันและชื่อผู้ตรวจที่ต้องการ</li>
                                    <li><b>กรอกข้อมูล:</b> เลือก Product Line, พื้นที่, และรายละเอียดโครงการให้ครบถ้วน</li>
                                    <li><b>เอกสาร:</b> ควรอัปโหลดรูป Layout, Wiring, และ Pre-check ในหน้าจองคิว (หรือกลับมาอัปโหลดภายหลังได้)</li>
                                    <li><b>การแก้ไข/ยกเลิก:</b> กดที่ช่องคิวงานของตนเอง จะมีปุ่มให้แก้ไขข้อมูลหรือยกเลิกคิวได้</li>
                                    <li><b>ตรวจสอบประวัติ:</b> กดปุ่มรูปนาฬิกาด้านบนเพื่อดูประวัติการแก้ไขข้อมูลของทุกคิวงาน</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showNotifs && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6">
                        <button onClick={() => setShowNotifs(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2"><Icons.Bell /> กล่องข้อความ</h3>
                        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                            {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).map((n, i) => (
                                <div key={i} onClick={() => markNotifAsRead(n.id)} className={`p-3 rounded-xl border cursor-pointer transition-all ${String(n.isRead) === 'true' ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-blue-50 border-blue-200 shadow-sm'}`}>
                                    <div className="text-xs text-slate-800">{n.message}</div>
                                    <div className="text-[9px] text-slate-400 mt-1 text-right">{new Date(n.timestamp).toLocaleString('th-TH')}</div>
                                </div>
                            ))}
                            {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).length === 0 && <p className="text-center text-slate-400 text-sm">ไม่มีข้อความใหม่</p>}
                        </div>
                    </div>
                </div>
            )}

            {modal && (
                <div className="backdrop z-[150]">
                    <div className="modal-card">
                        <button onClick={() => setModal(null)} className="btn-close-modern"><Icons.X /></button>
                        <div className="p-6 overflow-y-auto">
                            <div className="mb-6 border-b pb-4 pr-10">
                                <h3 className="text-xl font-bold text-slate-900">{modal.type === 'booking' ? 'จองคิวตรวจ' : 'รายละเอียด'}</h3>
                                <div className="text-xs text-red-600 font-bold uppercase mt-1">{modal.data.inspector_name} • {modal.data.date ? String(modal.data.date).split('T')[0] : ''}</div>
                            </div>
                            
                            {modal.type === 'booking' ? (
                                <form onSubmit={handleBookingSubmit} className="space-y-3">
                                    <input type="hidden" id="layout_img_input" name="layout_img" defaultValue={modal.data.layout_img || ''} />
                                    <input type="hidden" id="wiring_img_input" name="wiring_img" defaultValue={modal.data.wiring_img || ''} />
                                    <input type="hidden" id="precheck_img_input" name="precheck_img" defaultValue={modal.data.precheck_img || ''} />
                                    
                                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl mb-2">
                                        <label className="text-xs font-bold text-indigo-800 mb-1 block">Product Line</label>
                                        <select value={productLineSelection} onChange={(e) => setProductLineSelection(e.target.value)} className="w-full bg-white border border-indigo-200 p-2 rounded-lg text-sm font-bold text-slate-700 outline-none">
                                            <option value="ES1,3300">ES1,3300</option>
                                            <option value="5500">5500</option>
                                            <option value="ES5/ES5.1">ES5/ES5.1</option>
                                            <option value="S-villas">S-villas</option>
                                            <option value="ES2">ES2</option>
                                            <option value="ES3">ES3</option>
                                            <option value="MOR-R">MOR-R</option>
                                            <option value="S7R4">S7R4</option>
                                            <option value="7000">7000</option>
                                            <option value="อื่นๆโปรดระบุ">อื่นๆโปรดระบุ</option>
                                        </select>
                                        {productLineSelection === 'อื่นๆโปรดระบุ' && (
                                            <input name="custom_product_line" required placeholder="ระบุ Product Line..." className="mt-2 w-full p-2 border border-indigo-200 rounded-lg text-sm" />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-slate-500">พื้นที่ตรวจ (Area)</label><select value={areaSelection} onChange={(e) => setAreaSelection(e.target.value)} className="bg-slate-50"><option value="กรุงเทพและปริมณฑล">กทม.</option><option value="เชียงใหม่">เชียงใหม่</option><option value="ภูเก็ต">ภูเก็ต</option><option value="other">อื่นๆ</option></select></div>
                                        <div><label className="text-xs font-bold text-slate-500">ประเภทงาน</label><select value={jobTypeSelection} onChange={(e) => setJobTypeSelection(e.target.value)} className="bg-slate-50"><option value="New">New</option><option value="MOD">MOD</option></select></div>
                                    </div>
                                    {areaSelection === 'other' && <div><input name="custom_area" required placeholder="ระบุจังหวัด..." className="bg-slate-50" /></div>}
                                    <div><label className="text-xs font-bold text-slate-500">Project Name</label><input name="site_name" defaultValue={modal.data.site_name} required placeholder="ชื่อโครงการ" /></div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-slate-500">Eq No.</label><input name="equipment_no" defaultValue={modal.data.equipment_no} required placeholder="XXXX" /></div>
                                        <div><label className="text-xs font-bold text-slate-500">Unit</label><input name="unit_no" defaultValue={modal.data.unit_no} required placeholder="A1" /></div>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-xs font-bold text-slate-500">Google map (ใส่ลิงก์หรือพิกัด)</label>
                                        <input name="map_link" defaultValue={modal.data.map_link} placeholder="ใส่ลิงก์แผนที่ Google Maps" onChange={(e) => { if (window.mapTimeout) clearTimeout(window.mapTimeout); window.mapTimeout = setTimeout(() => handleMapChange(e.target.value), 800); }} className="bg-slate-50" />
                                        {(liveMapUrl) && (
                                            <div className="map-preview relative mt-2 bg-slate-100 rounded-xl overflow-hidden border"><iframe width="100%" height="100%" frameBorder="0" src={liveMapUrl} loading="lazy"></iframe></div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-slate-500">Foreman</label><input name="foreman" defaultValue={modal.data.foreman} required /></div>
                                        <div><label className="text-xs font-bold text-slate-500">Tel</label><input name="tel" defaultValue={modal.data.tel ? String(modal.data.tel).padStart(10, '0') : ''} type="tel" pattern="\d{10}" maxLength="10" required /></div>
                                    </div>
                                    <div><label className="text-xs font-bold text-slate-500">หมายเหตุ</label><textarea name="notes" defaultValue={modal.data.notes} rows="2" className="bg-slate-50 resize-none"></textarea></div>

                                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl space-y-3">
                                        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1"><Icons.Upload /> อัปโหลดรูปเอกสารประกอบ</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            <div className="bg-white p-2 rounded border">
                                                <label className="text-[10px] font-bold text-slate-600 block mb-1">1. Layout Drawing</label>
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'layout')} className="text-[10px] w-full" />
                                                {uploadingDoc.layout && <span className="text-[10px] text-blue-600 font-bold animate-pulse mt-1 block">กำลังอัปโหลด...</span>}
                                                {document.getElementById('layout_img_input')?.value && <span className="text-[10px] text-green-600 font-bold mt-1 block">✅ อัปโหลดสำเร็จ</span>}
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                <label className="text-[10px] font-bold text-slate-600 block mb-1">2. Wiring Diagram</label>
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'wiring')} className="text-[10px] w-full" />
                                                {uploadingDoc.wiring && <span className="text-[10px] text-blue-600 font-bold animate-pulse mt-1 block">กำลังอัปโหลด...</span>}
                                                {document.getElementById('wiring_img_input')?.value && <span className="text-[10px] text-green-600 font-bold mt-1 block">✅ อัปโหลดสำเร็จ</span>}
                                            </div>
                                            <div className="bg-white p-2 rounded border">
                                                <label className="text-[10px] font-bold text-slate-600 block mb-1">3. Pre-check</label>
                                                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'precheck')} className="text-[10px] w-full" />
                                                {uploadingDoc.precheck && <span className="text-[10px] text-blue-600 font-bold animate-pulse mt-1 block">กำลังอัปโหลด...</span>}
                                                {document.getElementById('precheck_img_input')?.value && <span className="text-[10px] text-green-600 font-bold mt-1 block">✅ อัปโหลดสำเร็จ</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {isAdmin && (
                                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl mt-2">
                                            <div className="text-xs font-bold text-red-800 mb-2 flex items-center gap-1"><Icons.FileCheck /> ADMIN CHECKLIST</div>
                                            <div className="flex flex-col gap-2">
                                                <label className="admin-check-item"><input type="checkbox" name="layout_doc" defaultChecked={String(modal.data.layout_doc) === 'true'} /> Layout Drawings</label>
                                                <label className="admin-check-item"><input type="checkbox" name="wiring_doc" defaultChecked={String(modal.data.wiring_doc) === 'true'} /> Wiring Diagram</label>
                                                <label className="admin-check-item"><input type="checkbox" name="precheck_doc" defaultChecked={String(modal.data.precheck_doc) === 'true'} /> Pre-check</label>
                                            </div>
                                        </div>
                                    )}
                                    <button disabled={loading || uploadingDoc.layout || uploadingDoc.wiring || uploadingDoc.precheck} className={`w-full py-3 mt-4 rounded-xl font-bold text-sm shadow-md transition-all ${(loading || uploadingDoc.layout || uploadingDoc.wiring || uploadingDoc.precheck) ? 'bg-slate-400' : 'bg-red-600 text-white'}`}>{(loading || uploadingDoc.layout || uploadingDoc.wiring || uploadingDoc.precheck) ? 'รอสักครู่...' : 'บันทึกข้อมูล'}</button>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold text-slate-900">{modal.data.site_name || '-'}</h2>
                                    
                                    {modal.data.product_line && (
                                        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-lg border border-indigo-200">
                                            Product: {modal.data.product_line}
                                        </div>
                                    )}

                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-y-4 text-sm mt-2">
                                        <div><span className="text-xs text-slate-400 block font-bold">Eq No.</span><b>{modal.data.equipment_no || '-'}</b></div>
                                        <div><span className="text-xs text-slate-400 block font-bold">Unit</span><b>{modal.data.unit_no || '-'}</b></div>
                                        <div><span className="text-xs text-slate-400 block font-bold">Foreman</span><b>{modal.data.foreman || '-'}</b></div>
                                        <div><span className="text-xs text-slate-400 block font-bold">Tel</span>{modal.data.tel ? <a href={`tel:${String(modal.data.tel).padStart(10, '0')}`} className="text-blue-600 font-bold">{String(modal.data.tel).padStart(10, '0')}</a> : <b>-</b>}</div>
                                        {modal.data.notes && <div className="col-span-2 mt-2 pt-3 border-t border-slate-200"><span className="text-xs text-slate-400 block font-bold flex items-center gap-1"><Icons.MessageSquare /> หมายเหตุ</span><p className="text-slate-700 mt-1 whitespace-pre-wrap text-sm leading-relaxed">{modal.data.notes}</p></div>}
                                    </div>
                                    
                                    {(modal.data.layout_img || modal.data.wiring_img || modal.data.precheck_img) && (
                                        <div className="mt-2 grid grid-cols-3 gap-2">
                                            {modal.data.layout_img && <a href={modal.data.layout_img} target="_blank" className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 font-bold text-[10px] text-center shadow-sm">🖼️ ดู Layout</a>}
                                            {modal.data.wiring_img && <a href={modal.data.wiring_img} target="_blank" className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 font-bold text-[10px] text-center shadow-sm">🖼️ ดู Wiring</a>}
                                            {modal.data.precheck_img && <a href={modal.data.precheck_img} target="_blank" className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 font-bold text-[10px] text-center shadow-sm">🖼️ ดู Pre-check</a>}
                                        </div>
                                    )}

                                    {modal.data.map_link && utils.getMapEmbedUrl(modal.data.map_link) && <div><span className="text-xs font-bold text-slate-500 uppercase">Location</span><div className="map-preview relative mt-1 bg-slate-100 rounded-xl overflow-hidden border"><iframe width="100%" height="100%" frameBorder="0" src={utils.getMapEmbedUrl(modal.data.map_link)} loading="lazy"></iframe></div></div>}

                                    <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                        <div className="text-xs font-bold text-slate-500 mb-2">ADMIN CHECKLIST</div>
                                        <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
                                            <div className={`p-2 rounded border ${String(modal.data.layout_doc) === 'true' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>Layout<br/>{String(modal.data.layout_doc) === 'true' ? '✅ ส่งแล้ว' : '❌ ยังไม่ส่ง'}</div>
                                            <div className={`p-2 rounded border ${String(modal.data.wiring_doc) === 'true' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>Wiring<br/>{String(modal.data.wiring_doc) === 'true' ? '✅ ส่งแล้ว' : '❌ ยังไม่ส่ง'}</div>
                                            <div className={`p-2 rounded border ${String(modal.data.precheck_doc) === 'true' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>Pre-check<br/>{String(modal.data.precheck_doc) === 'true' ? '✅ ส่งแล้ว' : '❌ ยังไม่ส่ง'}</div>
                                        </div>
                                    </div>

                                    {(isAdmin || user?.username === modal.data.created_by) && (
                                        <div className="flex gap-2 mt-4">
                                            <button onClick={() => { 
                                                setAreaSelection(modal.data.area || 'กรุงเทพและปริมณฑล'); 
                                                setJobTypeSelection(modal.data.job_type || 'New'); 
                                                setProductLineSelection(modal.data.product_line || 'ES1,3300');
                                                setModal({ type: 'booking', data: modal.data }); 
                                            }} className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm bg-slate-50">แก้ไข</button>
                                            <button onClick={() => {
                                                promptConfirm('ยกเลิกคิวงานนี้?', async () => {
                                                    const ok = await apiAction({ action: 'delete_booking', id: modal.data.id, user: user.username });
                                                    if (ok) { setModal(null); showToast('ยกเลิกรายการสำเร็จ'); }
                                                });
                                            }} className="flex-1 py-3 rounded-xl border border-red-200 text-red-600 font-bold text-sm bg-red-50">ยกเลิกคิว</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {alertMsg && (
                <div className="backdrop z-[300]">
                    <div className="bg-white w-[85%] max-w-[320px] rounded-3xl p-6 text-center shadow-2xl animate-pop">
                        <div className="mx-auto w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">แจ้งเตือน</h3>
                        <p className="text-sm text-slate-600 mb-6">{alertMsg}</p>
                        <button onClick={() => setAlertMsg(null)} className="w-full py-3 bg-slate-100 text-slate-800 rounded-xl font-bold">ตกลง</button>
                    </div>
                </div>
            )}

            {confirmDialog && (
                <div className="backdrop z-[300]">
                    <div className="bg-white w-[85%] max-w-[320px] rounded-3xl p-6 text-center shadow-2xl animate-pop">
                        <div className="mx-auto w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4"><Icons.Alert /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ยืนยัน</h3>
                        <p className="text-sm text-slate-600 mb-6">{confirmDialog.msg}</p>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmDialog(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold">ปิด</button>
                            <button onClick={() => { confirmDialog.onConfirm(); setConfirmDialog(null); }} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold">ยืนยัน</button>
                        </div>
                    </div>
                </div>
            )}

            {showLogin && (
                <div className="backdrop z-[250]">
                    <div className="modal-card p-6">
                        <button onClick={() => { setShowLogin(false); setIsRegisterMode(false); }} className="btn-close-modern"><Icons.X /></button>
                        <h2 className="text-2xl font-bold text-slate-800 text-center mb-6 mt-2">{isRegisterMode ? 'สมัครสมาชิกใหม่' : 'เข้าสู่ระบบ'}</h2>
                        <form onSubmit={async (e) => {
                            e.preventDefault(); const fd = new FormData(e.target);
                            if (isRegisterMode) {
                                if(fd.get('password') !== fd.get('confirm_password')) return setAlertMsg('รหัสผ่านไม่ตรงกัน');
                                const payload = { 
                                    action: 'register', username: fd.get('username'), password: fd.get('password'),
                                    fullname: fd.get('fullname'), department: fd.get('department'), position: fd.get('position'), email: fd.get('email'), phone: fd.get('phone')
                                };
                                const res = await apiAction(payload);
                                if (res) { showToast('สมัครสำเร็จ รอผู้ดูแลระบบอนุมัติ'); setIsRegisterMode(false); }
                            } else {
                                setLoading(true);
                                try {
                                    const res = await fetch(SCRIPT_URL, { method: 'POST', body: JSON.stringify({ action: 'login', username: fd.get('username'), password: fd.get('password') }) });
                                    const result = await res.json(); setLoading(false);
                                    if (result.status === 'ok') { setUser(result.user); setShowLogin(false); showToast('เข้าสู่ระบบสำเร็จ'); } else setAlertMsg(result.message);
                                } catch (err) { setLoading(false); setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                            }
                        }} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                            
                            {isRegisterMode && (
                                <div className="space-y-3 pb-2 border-b border-slate-100">
                                    <div><label className="text-[10px] font-bold text-slate-500">ชื่อ-นามสกุล</label><input name="fullname" required placeholder="นาย ระบุชื่อ สกุล" className="bg-slate-50 w-full" /></div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">แผนก</label><input name="department" required placeholder="เช่น QA" className="bg-slate-50 w-full" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">ตำแหน่ง</label><input name="position" required placeholder="เช่น Inspector" className="bg-slate-50 w-full" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-[10px] font-bold text-slate-500">อีเมล</label><input type="email" name="email" required placeholder="email@domain.com" className="bg-slate-50 w-full" /></div>
                                        <div><label className="text-[10px] font-bold text-slate-500">เบอร์โทรศัพท์</label><input type="tel" name="phone" required placeholder="08XXXXXXXX" className="bg-slate-50 w-full" /></div>
                                    </div>
                                </div>
                            )}
                            
                            <div><label className="text-[10px] font-bold text-slate-500">Username (ใช้ล็อกอิน)</label><input name="username" required placeholder="Username" className="bg-slate-50 w-full" /></div>
                            
                            <div className="relative">
                                <label className="text-[10px] font-bold text-slate-500">Password</label>
                                <input name="password" type={showPassword ? "text" : "password"} required placeholder="Password" className="bg-slate-50 pr-12 w-full" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[32px] text-slate-400">{showPassword ? <Icons.EyeOff /> : <Icons.Eye />}</button>
                            </div>
                            
                            {isRegisterMode && (
                                <div><label className="text-[10px] font-bold text-slate-500">ยืนยัน Password</label><input name="confirm_password" type={showPassword ? "text" : "password"} required placeholder="Confirm Password" className="bg-slate-50 w-full" /></div>
                            )}

                            <button disabled={loading} className="w-full py-3.5 rounded-xl text-white font-bold bg-red-600 mt-4">{loading ? 'รอสักครู่...' : (isRegisterMode ? 'ส่งข้อมูลสมัครสมาชิก' : 'LOGIN')}</button>
                            <div className="text-center mt-4"><button type="button" onClick={() => setIsRegisterMode(!isRegisterMode)} className="text-sm font-bold text-slate-500 underline">{isRegisterMode ? 'มีบัญชีอยู่แล้ว? กลับไปหน้าเข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิกที่นี่'}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
