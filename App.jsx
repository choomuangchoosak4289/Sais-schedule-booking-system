const App = () => {
    const SCRIPT_URL = window?.SAIS_CONFIG?.SCRIPT_URL || "";
    const ADMIN_USERNAME = window?.SAIS_CONFIG?.ADMIN_USERNAME || "jiraphong2227";
    const utils = window?.SAIS_UTILS || {};

    const [db, setDb] = useState({ bookings: [], users: [], logs: [], notifications: [], inspectors: [] });
    
    // 📍 [ข้อ 4.1] ระบบ Session หมดอายุ 24 ชม.
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
    const [successModal, setSuccessModal] = useState(null); // 📍 [ข้อ 3] ใช้แทน Toast

    const [currentView, setCurrentView] = useState('calendar'); 
    const [modal, setModal] = useState(null); 
    const [showLogin, setShowLogin] = useState(false);
    const [isRegisterMode, setIsRegisterMode] = useState(false); 
    const [showPassword, setShowPassword] = useState(false); 
    const [showActivityModal, setShowActivityModal] = useState(false);
    const [activityTab, setActivityTab] = useState('notif');
    const [showManual, setShowManual] = useState(false);
    
    // 📍 [ข้อ 3.3] ระบบตั้งค่าขนาดฟอนต์
    const [showSettings, setShowSettings] = useState(false);
    const [fontScale, setFontScale] = useState(() => parseFloat(localStorage.getItem('sais_font_scale') || '1'));

    const [currentDate, setCurrentDate] = useState(new Date());
    const [period, setPeriod] = useState(new Date().getDate() > 15 ? 1 : 0); 
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
    const [showParticipantDropdown, setShowParticipantDropdown] = useState(false);
    const [eventParticipants, setEventParticipants] = useState(['ALL']);

    const [holidayStartDate, setHolidayStartDate] = useState('');
    const [holidayEndDate, setHolidayEndDate] = useState('');

    const [selectedLeavesToDelete, setSelectedLeavesToDelete] = useState([]);
    const [selectedEventsToDelete, setSelectedEventsToDelete] = useState([]);
    const [selectedHolidaysToDelete, setSelectedHolidaysToDelete] = useState([]);

    const [liveMapUrl, setLiveMapUrl] = useState('');
    const scrollRef = useRef(null);

    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    // อัปเดต Font Scale เข้าสู่ CSS Variable
    useEffect(() => {
        document.documentElement.style.setProperty('--font-scale', fontScale);
        localStorage.setItem('sais_font_scale', fontScale);
    }, [fontScale]);

    const handleMapChange = (val) => {
        if (utils && typeof utils.getMapEmbedUrl === 'function') {
            setLiveMapUrl(utils.getMapEmbedUrl(val) || '');
        } else { setLiveMapUrl(''); }
    };

    const calculateTimeDuration = (start, end) => {
        if (!start || !end) return null;
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        let diffMins = (eh * 60 + em) - (sh * 60 + sm);
        if (diffMins < 0) return 0; // 📍 [ข้อ 1.2] ป้องกันคำนวณข้ามคืนมั่ว
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

    const leaveMins = calculateTimeDuration(leaveStartTime, leaveEndTime);
    const eventMins = calculateTimeDuration(eventStartTime, eventEndTime);

    const handleEventParticipantChange = (e) => {
        const val = e.target.value; const checked = e.target.checked;
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
                // 📍 [ข้อ 2.1] ยิง API ไปเป็น Array ในครั้งเดียวเลย
                try {
                    const res = await utils.fetchWithRetry(SCRIPT_URL, { 
                        method: 'POST', 
                        body: JSON.stringify({ action: 'delete_multiple', ids: ids, user: user.username }) 
                    });
                    if (res.status === 'ok') {
                        if (type === 'leave') setSelectedLeavesToDelete([]);
                        if (type === 'event') setSelectedEventsToDelete([]);
                        if (type === 'holiday') setSelectedHolidaysToDelete([]);
                        await fetchData();
                        setSuccessModal(`ลบสำเร็จ ${res.deleted} รายการ`);
                    } else {
                        setAlertMsg('เกิดข้อผิดพลาดในการลบ');
                    }
                } catch(e) { setAlertMsg('การเชื่อมต่อขัดข้อง'); }
                setLoadingMsg(null);
            }
        });
    };

    // 📍 [ข้อ 1.3] Parse วันที่อย่างปลอดภัย ไม่ให้เพี้ยน Timezone (บังคับตั้งเวลาเที่ยงวัน)
    const generateDates = (startStr, endStr, omitSunday = true) => {
        if (!startStr || !endStr) return [];
        let start = new Date(`${startStr}T12:00:00`); 
        let end = new Date(`${endStr}T12:00:00`);
        if (start > end) return [];
        let dates = []; let current = new Date(start);
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
        if (user) {
            localStorage.setItem('sais_user', JSON.stringify(user));
            localStorage.setItem('sais_session_time', Date.now().toString());
        } else {
            localStorage.removeItem('sais_user');
            localStorage.removeItem('sais_session_time');
        }
    }, [user]);

    // 📍 [ข้อ 2.2] หยุดดึงข้อมูลถ้ายูสเซอร์พับแอปไว้ (ประหยัดแบต)
    useEffect(() => {
        const load = async () => { await fetchData(); setInitialLoad(false); }
        if(SCRIPT_URL) load();
        const timer = setInterval(() => { 
            if (document.visibilityState === 'visible' && !modal && !showLogin && !showActivityModal && !alertMsg && !confirmDialog && !promptDialog && !loadingMsg && !successModal && SCRIPT_URL) {
                fetchData(); 
            }
        }, 180000); 
        return () => clearInterval(timer);
    }, [modal, showLogin, showActivityModal, alertMsg, confirmDialog, promptDialog, loadingMsg, successModal, SCRIPT_URL]);

    const fetchData = async () => {
        if (!SCRIPT_URL || !utils.fetchWithRetry) return;
        try {
            const data = await utils.fetchWithRetry(SCRIPT_URL, { method: 'GET' });
            if (data) setDb({ bookings: data.bookings || [], users: data.users || [], logs: data.logs || [], notifications: data.notifications || [], inspectors: data.inspectors || [] });
        } catch (e) { console.error("Fetch Error"); }
    };

    const showSlideToast = (msg, type = 'success') => { 
        if (type === 'success') setSuccessModal(msg); else setAlertMsg(msg); 
    };

    const apiAction = async (payload, customLoadMsg = 'กำลังบันทึกข้อมูล...') => {
        if (!SCRIPT_URL) return false;
        setLoadingMsg(customLoadMsg);
        try {
            const result = await utils.fetchWithRetry(SCRIPT_URL, { method: 'POST', body: JSON.stringify(payload) });
            setLoadingMsg(null);
            if (result.status === 'ok') { await fetchData(); return true; } 
            else { setAlertMsg(result.message || 'ไม่ทราบสาเหตุ'); return false; }
        } catch (e) { setLoadingMsg(null); setAlertMsg('การเชื่อมต่อขัดข้อง'); return false; }
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

    const handleCancelBooking = (booking) => {
        if(!booking?.id) return;
        setConfirmDialog({
            msg: "ยืนยันลบการตั้งค่านี้ใช่หรือไม่?",
            onConfirm: async () => {
                setConfirmDialog(null);
                const ok = await apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: 'ลบโดยแอดมิน' }, 'กำลังลบ...');
                if(ok) setSuccessModal('ลบสำเร็จ');
            }
        });
    };

    const handleCancelJob = (booking) => {
        if(!booking?.id) return;
        setPromptDialog({
            msg: "โปรดระบุเหตุผลในการยกเลิกคิวงานนี้:",
            onSubmit: (reason) => {
                apiAction({ action: 'delete_booking', id: booking.id, user: user?.username || 'admin', reason: reason || 'ไม่ระบุเหตุผล' }, 'กำลังยกเลิกคิวงาน...').then(ok => {
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
        e.preventDefault(); e.currentTarget.classList.remove('drag-over');
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

    useEffect(() => { 
        if (modal?.type === 'booking') { handleMapChange(modal?.data?.map_link || ''); } else { setLiveMapUrl(''); }
    }, [modal]);

    const changePeriod = (dir) => {
        let newDate = new Date(currentDate);
        if (dir === 'next') { if (period === 0) setPeriod(1); else { setPeriod(0); newDate.setMonth(newDate.getMonth() + 1); setCurrentDate(newDate); } } 
        else { if (period === 1) setPeriod(0); else { setPeriod(1); newDate.setMonth(newDate.getMonth() - 1); setCurrentDate(newDate); } }
    };

    const todayLocalString = utils.getLocalDateString ? utils.getLocalDateString(new Date()) : new Date().toISOString().split('T')[0];
    
    const filteredBookings = useMemo(() => {
        return (db.bookings || []).filter(b => {
            const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
            return matchArea;
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
    }, [currentDate, period, db.bookings]);

    const handleBookingSubmit = async (e) => {
        e.preventDefault(); const fd = new FormData(e.target); const data = Object.fromEntries(fd);
        if (!user?.username) return setAlertMsg('กรุณาเข้าสู่ระบบก่อนทำรายการ');
        
        let finalArea = areaSelection === 'other' ? (fd.get('custom_area') || 'ไม่ระบุ') : areaSelection;
        let finalProductLine = productLineSelection === 'อื่นๆโปรดระบุ' ? (fd.get('custom_product_line') || 'ไม่ระบุ') : productLineSelection;

        const isFromAdminPanel = modal?.data?.isAdminOverride === true;
        const targetInspector = isFromAdminPanel ? fd.get('admin_inspector_target') : modal?.data?.inspector_name;
        const targetDate = isFromAdminPanel ? fd.get('admin_date_target') : modal?.data?.date;

        if (!targetInspector || !targetDate) return setAlertMsg('ข้อมูลวันหรือผู้ตรวจไม่ครบถ้วน');

        if (quickAddType !== 'job') {
            let p_jobType = '', p_siteName = fd.get('site_name'), p_eq = '';
            const sTime = fd.get('start_time'); const eTime = fd.get('end_time');
            // 📍 [ข้อ 1.2] Validation เวลา
            if (sTime && eTime && sTime >= eTime) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");

            if (sTime && eTime) p_siteName = `${sTime}-${eTime} ${p_siteName}`;

            if (quickAddType === 'leave') {
                p_jobType = 'leave';
                if (fd.get('leave_type') === 'อื่นๆโปรดระบุ') p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('custom_leave');
                else p_siteName = (sTime && eTime ? `${sTime}-${eTime} ` : '') + fd.get('leave_type');
                p_eq = `LEAVE_${Date.now()}`;
            } else if (quickAddType === 'event') {
                p_jobType = 'company_event'; p_eq = `EVENT_${Date.now()}`;
            } else if (quickAddType === 'holiday') {
                p_jobType = 'public_holiday'; p_eq = `HLD_${Date.now()}`;
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
        if (jStart && jEnd && jStart >= jEnd) return setAlertMsg("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น");
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

        if (isAdmin) { payload.layout_doc = data.layout_doc ? 'true' : 'false'; payload.wiring_doc = data.wiring_doc ? 'true' : 'false'; payload.precheck_doc = data.precheck_doc ? 'true' : 'false'; } 
        else if (modal?.data?.id) { payload.layout_doc = String(modal?.data?.layout_doc || 'false'); payload.wiring_doc = String(modal?.data?.wiring_doc || 'false'); payload.precheck_doc = String(modal?.data?.precheck_doc || 'false'); } 
        else { payload.layout_doc = 'false'; payload.wiring_doc = 'false'; payload.precheck_doc = 'false'; }

        const ok = await apiAction(payload, modal?.data?.id ? 'กำลังอัปเดตข้อมูล...' : 'กำลังบันทึกคิวงาน...');
        if (ok) { setModal(null); setAreaSelection('กรุงเทพและปริมณฑล'); setJobTypeSelection('New'); setProductLineSelection('ES1,3300'); setLiveMapUrl(''); setSuccessModal(modal?.data?.id ? 'แก้ไขคิวงานสำเร็จ!' : 'จองคิวงานสำเร็จ!'); }
    };

    // 📍 [ข้อ 4] ดึงชื่อคนรับผิดชอบใหม่มาบันทึก
    const handleEditSpecialSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const newTitle = fd.get('site_name');
        const newInspector = fd.get('inspector_name');
        const ok = await apiAction({ action: 'update_booking', id: modal.data.id, site_name: newTitle, inspector_name: newInspector, user: user.username }, 'กำลังอัปเดต...');
        if(ok) { setModal(null); setSuccessModal('อัปเดตสำเร็จ'); }
    };

    if (!SCRIPT_URL) return <div className="h-screen w-full flex items-center justify-center flex-col gap-4 p-8 text-center"><div className="text-4xl text-red-500"><Icons.Alert /></div><h2 className="text-xl font-bold text-slate-800">เกิดข้อผิดพลาด</h2><p className="text-slate-600 text-sm">ไม่พบการตั้งค่าเชื่อมต่อฐานข้อมูล (URL)</p></div>;

    return (
        <div className="app-container" style={{ "--font-scale": fontScale }} onClick={() => setShowParticipantDropdown(false)}>
            {/* 📍 [ข้อ 3] เปลี่ยน Toast เป็น Modal สำหรับ Success */}
            {successModal && (
                <div className="backdrop z-[700]">
                    <div className="bg-white w-[85%] max-w-[320px] rounded-3xl p-6 text-center shadow-2xl animate-pop border-4 border-green-400">
                        <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4"><Icons.Check /></div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">ทำรายการสำเร็จ</h3>
                        <p className="text-sm text-slate-600 mb-6">{successModal}</p>
                        <button onClick={() => setSuccessModal(null)} className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-md active:scale-95 transition-all">ตกลง</button>
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
                    {/* 📍 [ข้อ 3.3] ปุ่มตั้งค่าฟอนต์ */}
                    <button className="btn-icon" onClick={() => setShowSettings(!showSettings)}><Icons.Settings /></button>
                    {showSettings && (
                        <div className="settings-menu animate-pop">
                            <h4 className="text-sm font-bold border-b pb-2 mb-2">ปรับขนาดตัวหนังสือ</h4>
                            <div className="flex justify-between items-center gap-2">
                                <button className="bg-slate-100 p-2 rounded w-10 font-bold" onClick={() => setFontScale(prev => Math.max(0.8, prev - 0.1))}>A-</button>
                                <span className="text-xs font-bold text-blue-600">{(fontScale * 100).toFixed(0)}%</span>
                                <button className="bg-slate-100 p-2 rounded w-10 font-bold" onClick={() => setFontScale(prev => Math.min(1.5, prev + 0.1))}>A+</button>
                            </div>
                        </div>
                    )}
                    <button className="btn-icon" onClick={() => setShowManual(true)} title="คู่มือการใช้งาน"><Icons.Book /></button>
                    {user && (
                        <button className="btn-icon relative" onClick={() => setShowActivityModal(true)}>
                            <Icons.Bell />
                            {unreadNotifs.length > 0 && <span className="notif-dot animate-pulse"></span>}
                        </button>
                    )}
                    {!user ? <button className="ml-1 bg-white text-red-700 px-4 py-1.5 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm" onClick={() => setShowLogin(true)}>LOGIN <Icons.User /></button>
                           : <div className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg flex items-center gap-1"><Icons.User /> {user.username}</div>}
                </div>
            </header>

            <div className="bottom-nav">
                <div className={`nav-item ${currentView === 'calendar' ? 'active' : ''}`} onClick={() => setCurrentView('calendar')}><Icons.Home /> ปฏิทิน</div>
                <div className={`nav-item ${currentView === 'search' ? 'active' : ''}`} onClick={() => setCurrentView('search')}><Icons.Search /> ค้นหา</div>
                {isAdmin && <div className={`nav-item ${currentView === 'documents' ? 'active' : ''}`} onClick={() => setCurrentView('documents')}><Icons.FileText /> ตรวจเอกสาร</div>}
                {!isAdmin && <div className={`nav-item ${currentView === 'my_bookings' ? 'active' : ''}`} onClick={() => { if(!user) setShowLogin(true); else setCurrentView('my_bookings'); }}><Icons.List /> งานฉัน</div>}
                {isAdmin && <div className={`nav-item ${currentView === 'admin' ? 'active' : ''}`} onClick={() => { setCurrentView('admin'); setAdminTab('menu'); }}><Icons.Shield /> จัดการ</div>}
                {user && <div className="nav-item text-red-500 hover:text-red-600" onClick={handleLogout}><Icons.LogOut /> ออกระบบ</div>}
            </div>

            {currentView === 'calendar' && (
                <CalendarGrid 
                    daysInView={daysInView} db={db} isAdmin={isAdmin} user={user} setShowLogin={setShowLogin} 
                    setModal={setModal} setAlertMsg={setAlertMsg} handleDrop={handleDrop} handleDragOver={handleDragOver} 
                    handleDragLeave={handleDragLeave} handleDragStart={handleDragStart} setConfirmDialog={setConfirmDialog} 
                    apiAction={apiAction} setQuickAddType={setQuickAddType}
                />
            )}

            {currentView === 'documents' && isAdmin && (
                <div className="page-view relative">
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
                <div className="page-view relative">
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
                        {searchQuery.trim() === '' && filterArea === 'All' ? (
                            <div className="text-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-xl mt-4">พิมพ์ข้อมูลหรือเลือกพื้นที่เพื่อเริ่มค้นหา...</div>
                        ) : (
                            (() => {
                                const searchResults = (db.bookings || []).filter(b => {
                                    if (String(b.inspector_name) === 'SYSTEM_HOLIDAY' || String(b.inspector_name) === 'SYSTEM_EVENT') return false;
                                    if (String(b.equipment_no).startsWith('LEAVE_') || String(b.equipment_no).startsWith('EVENT_')) return false;
                                    if (String(b.status) === 'cancelled') return false;
                                    
                                    const matchArea = filterArea === 'All' ? true : String(b.area || '') === filterArea;
                                    const s = searchQuery.toLowerCase();
                                    const matchSearch = String(b.equipment_no || '').toLowerCase().includes(s) || 
                                                        String(b.site_name || '').toLowerCase().includes(s) || 
                                                        String(b.inspector_name || '').toLowerCase().includes(s);
                                                        
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

            {currentView === 'my_bookings' && !isAdmin && (
                <div className="page-view relative">
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
                                const isPast = new Date(b.date) < new Date(todayLocalString); 

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
                                                <div className="text-[10px] font-bold text-blue-600 mb-2">{h.date ? String(h.date).split('T')[0] : '-'}</div>
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
                <div className="page-view">
                    <div className="flex justify-between items-end mb-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Icons.Shield /> Admin Panel</h2>
                    </div>

                    {adminTab === 'menu' && (
                        <div className="grid grid-cols-2 gap-4 animate-pop pb-10">
                            <button onClick={() => setAdminTab('users')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 col-span-2">
                                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><Icons.User /></div>
                                <span className="font-bold text-slate-700 text-sm">จัดการพนักงานและสมาชิก</span>
                            </button>
                            
                            <button onClick={() => utils.exportToCSV(db.bookings)} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"><Icons.Download /></div>
                                <span className="font-bold text-slate-700 text-sm">โหลดข้อมูล (CSV)</span>
                            </button>
                            
                            <button onClick={() => {
                                setLoadingMsg('กำลังประมวลผลรูปภาพความละเอียด 16K... (อาจใช้เวลาสักครู่)');
                                setCurrentView('calendar');
                                setTimeout(() => {
                                    utils.exportToJPG('calendar-export-area').then(() => setLoadingMsg(null)).catch(() => setLoadingMsg(null));
                                }, 1500);
                            }} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Icons.Image /></div>
                                <span className="font-bold text-slate-700 text-sm">โหลดตาราง (JPG)</span>
                            </button>

                            <button onClick={() => setAdminTab('analytics')} className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center gap-3 col-span-2">
                                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Icons.Chart /></div>
                                <span className="font-bold text-slate-700 text-sm">สถิติระบบ</span>
                            </button>
                            
                            <button onClick={() => setAdminTab('leaves')} className="p-5 bg-yellow-50 rounded-2xl shadow-sm border border-yellow-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><Icons.Clock /></div>
                                <span className="font-bold text-yellow-800 text-sm">ตั้งค่าวันลา</span>
                            </button>
                            
                            <button onClick={() => setAdminTab('events')} className="p-5 bg-green-50 rounded-2xl shadow-sm border border-green-200 flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><Icons.Star /></div>
                                <span className="font-bold text-green-800 text-sm">ตั้งค่ากิจกรรมบริษัท</span>
                            </button>

                            <button onClick={() => setAdminTab('holidays')} className="p-5 bg-red-50 rounded-2xl shadow-sm border border-red-200 flex flex-col items-center gap-3 col-span-2">
                                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><Icons.CalendarX /></div>
                                <span className="font-bold text-red-800 text-sm">ตั้งค่าวันหยุดนักขัตฤกษ์</span>
                            </button>
                        </div>
                    )}

                    {adminTab !== 'menu' && (
                        <button onClick={() => setAdminTab('menu')} className="mb-4 text-xs font-bold text-slate-500 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border shadow-sm">
                            <Icons.ChevronLeft /> กลับเมนูหลัก
                        </button>
                    )}

                    {adminTab === 'analytics' && (
                        <div className="space-y-4 animate-pop pb-10">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">🏆 สถิติจำนวนงานตรวจ</h3>
                                <div className="space-y-4">
                                    {(db.inspectors || []).map(ins => {
                                        const insBookings = db.bookings.filter(b => String(b.inspector_name) === String(ins.name) && String(b.inspector_name) !== 'SYSTEM_HOLIDAY' && String(b.status) !== 'cancelled' && !String(b.equipment_no).startsWith('LEAVE_') && !String(b.equipment_no).startsWith('EVENT_'));
                                        const total = insBookings.length;
                                        if(total === 0) return null; 
                                        
                                        const productCounts = insBookings.reduce((acc, curr) => {
                                            const pl = curr.product_line && curr.product_line !== '' ? curr.product_line : 'อื่นๆโปรดระบุ';
                                            acc[pl] = (acc[pl] || 0) + 1; return acc;
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

                    {adminTab === 'users' && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-pop pb-10">
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
                                                    {u.status === 'pending' && <button onClick={() => setConfirmDialog({msg: `อนุมัติให้ ${u.username} ใช้งานระบบ?`, onConfirm: () => { setConfirmDialog(null); apiAction({action: 'update_user_status', admin_user: user.username, target_user: u.username, new_status: 'approved'}, 'กำลังอนุมัติ...'); }})} className="bg-green-500 text-white px-3 py-1 rounded-lg shadow-sm">อนุมัติ</button>}
                                                    {u.status === 'approved' && <button onClick={() => setConfirmDialog({msg: `ระงับผู้ใช้ ${u.username} ไม่ให้เข้าสู่ระบบ?`, onConfirm: () => { setConfirmDialog(null); apiAction({action: 'update_user_status', admin_user: user.username, target_user: u.username, new_status: 'blocked'}, 'กำลังระงับบัญชี...'); }})} className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-sm">บล็อก</button>}
                                                    {u.status === 'blocked' && <button onClick={() => setConfirmDialog({msg: `ปลดบล็อกให้ ${u.username}?`, onConfirm: () => { setConfirmDialog(null); apiAction({action: 'update_user_status', admin_user: user.username, target_user: u.username, new_status: 'approved'}, 'กำลังปลดบล็อก...'); }})} className="bg-slate-500 text-white px-3 py-1 rounded-lg shadow-sm">ปลดบล็อก</button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {adminTab === 'leaves' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <form onSubmit={async (e) => {
                                e.preventDefault(); 
                                if (leaveDates.length === 0) return setAlertMsg('ไม่มีวันลาที่สามารถตั้งค่าได้');
                                
                                let finalLeaveName = leaveType === 'อื่นๆโปรดระบุ' ? customLeaveType : leaveType;
                                if (leaveType === 'อื่นๆโปรดระบุ' && !customLeaveType.trim()) return setAlertMsg('กรุณาระบุประเภทการลา');
                                
                                if (leaveStartTime && leaveEndTime) finalLeaveName = `${leaveStartTime}-${leaveEndTime} ${finalLeaveName}`;

                                setConfirmDialog({
                                    msg: `ยืนยันบันทึก ${finalLeaveName} ให้ ${leaveInspector} จำนวน ${leaveDates.length} วัน?`,
                                    onConfirm: async () => {
                                        setConfirmDialog(null);
                                        const payload = { action: 'create_multiple_bookings', dates: leaveDates, inspector_name: leaveInspector, job_type: 'leave', site_name: finalLeaveName, equipment_no: `LEAVE_${Date.now()}`, user: user.username };
                                        const ok = await apiAction(payload, 'กำลังบันทึกวันลา...');
                                        if(ok) { setSuccessModal('เพิ่มวันลาสำเร็จ'); setLeaveStartDate(''); setLeaveEndDate(''); setLeaveInspector(''); setCustomLeaveType(''); setLeaveStartTime(''); setLeaveEndTime(''); e.target.reset(); }
                                    }
                                });
                            }} className="bg-yellow-50 p-4 rounded-xl shadow-sm border border-yellow-200">
                                <h3 className="font-bold text-yellow-800 mb-3 border-b border-yellow-200 pb-2">➕ ระบุวันลาของผู้ตรวจ</h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs font-bold text-yellow-700">ผู้ตรวจ</label>
                                        <select value={leaveInspector} onChange={e=>setLeaveInspector(e.target.value)} required className="bg-white p-2 rounded-lg border border-yellow-200 w-full text-sm font-bold outline-none">
                                            <option value="">-- เลือกผู้ตรวจ --</option>
                                            {(db.inspectors || []).map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-yellow-700">จากวันที่</label><input type="date" value={leaveStartDate} onChange={e=>setLeaveStartDate(e.target.value)} required className="bg-white p-2 rounded-lg border border-yellow-200 w-full text-sm outline-none" /></div>
                                        <div><label className="text-xs font-bold text-yellow-700">ถึงวันที่</label><input type="date" value={leaveEndDate} onChange={e=>setLeaveEndDate(e.target.value)} required className="bg-white p-2 rounded-lg border border-yellow-200 w-full text-sm outline-none" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-yellow-700">เวลาเริ่ม (ไม่บังคับ)</label><input type="time" value={leaveStartTime} onChange={e=>setLeaveStartTime(e.target.value)} className="bg-white p-2 rounded-lg border border-yellow-200 w-full text-sm outline-none" /></div>
                                        <div><label className="text-xs font-bold text-yellow-700">เวลาสิ้นสุด (ไม่บังคับ)</label><input type="time" value={leaveEndTime} onChange={e=>setLeaveEndTime(e.target.value)} className="bg-white p-2 rounded-lg border border-yellow-200 w-full text-sm outline-none" /></div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-yellow-700">ประเภทการลา</label>
                                        <select value={leaveType} onChange={e=>setLeaveType(e.target.value)} className="bg-white p-2 rounded-lg border border-yellow-200 w-full text-sm font-bold outline-none">
                                            <option value="ลาพักร้อน">ลาพักร้อน</option><option value="ลาป่วย">ลาป่วย</option><option value="ลากิจ">ลากิจ</option><option value="อื่นๆโปรดระบุ">อื่นๆโปรดระบุ</option>
                                        </select>
                                        {leaveType === 'อื่นๆโปรดระบุ' && (<input type="text" value={customLeaveType} onChange={e => setCustomLeaveType(e.target.value)} placeholder="โปรดระบุสาเหตุการลา..." required className="mt-2 bg-white p-2 rounded-lg border border-yellow-300 w-full text-sm outline-none" />)}
                                    </div>
                                    
                                    {(leaveStartDate && leaveEndDate && leaveInspector) && (
                                        <div className="p-3 bg-white border border-yellow-300 rounded-lg text-center shadow-sm">
                                            <div className="text-xs font-bold text-yellow-700 mb-1">ระยะเวลา (ไม่รวมวันอาทิตย์/หยุด)</div>
                                            <div className="text-xl font-black text-yellow-600">
                                                {leaveDates.length} <span className="text-sm font-bold">วัน</span>
                                            </div>
                                            {leaveMins > 0 && <div className="text-xs text-yellow-600 font-bold mt-1 bg-yellow-50 p-1.5 rounded">เวลา: {formatDuration(leaveMins)}/วัน <br/>(รวม: {formatDuration(leaveDates.length * leaveMins)})</div>}
                                        </div>
                                    )}
                                    <button disabled={loadingMsg || leaveDates.length === 0} className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${leaveDates.length > 0 ? 'bg-yellow-600 text-white shadow-md' : 'bg-yellow-200 text-yellow-400'}`}>บันทึกวันลา</button>
                                </div>
                            </form>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-200 mt-4">
                                <div className="flex justify-between items-center mb-3 border-b border-yellow-100 pb-2">
                                    <h3 className="font-bold text-yellow-800">รายการวันลาที่ตั้งไว้</h3>
                                    {selectedLeavesToDelete.length > 0 && (
                                        <button onClick={() => handleBulkDelete('leave', selectedLeavesToDelete)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm font-bold flex items-center gap-1"><Icons.Trash /> ลบ ({selectedLeavesToDelete.length})</button>
                                    )}
                                </div>
                                <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                                    {(db.bookings || []).filter(b => b.job_type === 'leave' && String(b.status) !== 'cancelled').sort((a,b)=> new Date(b.date) - new Date(a.date)).map((h, i) => (
                                        <label key={i} className="flex justify-between items-center bg-yellow-50 p-2 rounded-lg border border-yellow-100 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600" checked={selectedLeavesToDelete.includes(h.id)} onChange={(e) => { if(e.target.checked) setSelectedLeavesToDelete([...selectedLeavesToDelete, h.id]); else setSelectedLeavesToDelete(selectedLeavesToDelete.filter(id => id !== h.id)); }} />
                                                <div>
                                                    <div className="text-[10px] font-bold text-yellow-800">{h.date ? String(h.date).split('T')[0] : ''} | {h.inspector_name}</div>
                                                    <div className="text-xs text-yellow-700 font-bold">{h.site_name}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <button type="button" onClick={(e) => { e.preventDefault(); setModal({ type: 'edit_special', data: h }); }} className="text-blue-500 p-1.5 bg-white rounded shadow-sm border border-blue-100"><Icons.Edit /></button>
                                                <button type="button" onClick={(e) => { e.preventDefault(); handleCancelBooking(h); }} className="text-red-500 p-1.5 bg-white rounded shadow-sm border border-red-100"><Icons.X /></button>
                                            </div>
                                        </label>
                                    ))}
                                    {(db.bookings || []).filter(b => b.job_type === 'leave' && String(b.status) !== 'cancelled').length === 0 && <div className="text-xs text-slate-400 text-center py-2">ไม่มีข้อมูลวันลา</div>}
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'events' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <form onSubmit={async (e) => {
                                e.preventDefault(); 
                                if (eventDates.length === 0) return setAlertMsg('ไม่มีวันที่สามารถตั้งค่าได้');
                                if (eventParticipants.length === 0) return setAlertMsg('กรุณาเลือกผู้เข้าร่วมอย่างน้อย 1 คน');
                                const fd = new FormData(e.target);
                                
                                let eventName = fd.get('event_name');
                                if (eventStartTime && eventEndTime) eventName = `${eventStartTime}-${eventEndTime} ${eventName}`;

                                setConfirmDialog({
                                    msg: `ยืนยันบันทึกกิจกรรม ${eventName} ให้ ${eventParticipants.includes('ALL') ? 'ผู้ตรวจทุกคน' : eventParticipants.length + ' คน'} จำนวน ${eventDates.length} วัน?`,
                                    onConfirm: async () => {
                                        setConfirmDialog(null);
                                        let allSuccess = true;
                                        
                                        if (eventParticipants.includes('ALL')) {
                                            const payload = { action: 'create_multiple_bookings', dates: eventDates, inspector_name: 'SYSTEM_EVENT', job_type: 'company_event', site_name: eventName, equipment_no: `EVENT_${Date.now()}`, user: user.username };
                                            allSuccess = await apiAction(payload, 'กำลังบันทึกกิจกรรม...');
                                        } else {
                                            setLoadingMsg('กำลังบันทึกข้อมูลแบบกลุ่ม...');
                                            for (const p of eventParticipants) {
                                                const payload = { action: 'create_multiple_bookings', dates: eventDates, inspector_name: p, job_type: 'company_event', site_name: eventName, equipment_no: `EVENT_${Date.now()}_${p}`, user: user.username };
                                                const ok = await apiAction(payload, `กำลังบันทึกให้ ${p}...`);
                                                if (!ok) allSuccess = false;
                                            }
                                            setLoadingMsg(null);
                                        }

                                        if (allSuccess) { 
                                            setSuccessModal('เพิ่มกิจกรรมสำเร็จ'); 
                                            setEventStartDate(''); setEventEndDate(''); setEventStartTime(''); setEventEndTime(''); setEventParticipants(['ALL']); e.target.reset(); 
                                        }
                                    }
                                });
                            }} className="bg-green-50 p-4 rounded-xl shadow-sm border border-green-200">
                                <h3 className="font-bold text-green-800 mb-3 border-b border-green-200 pb-2">➕ ระบุกิจกรรมบริษัท</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-green-700">จากวันที่</label><input type="date" value={eventStartDate} onChange={e=>setEventStartDate(e.target.value)} required className="bg-white p-2 rounded-lg border border-green-200 w-full text-sm outline-none" /></div>
                                        <div><label className="text-xs font-bold text-green-700">ถึงวันที่</label><input type="date" value={eventEndDate} onChange={e=>setEventEndDate(e.target.value)} required className="bg-white p-2 rounded-lg border border-green-200 w-full text-sm outline-none" /></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-green-700">เวลาเริ่ม (ไม่บังคับ)</label><input type="time" value={eventStartTime} onChange={e=>setEventStartTime(e.target.value)} className="bg-white p-2 rounded-lg border border-green-200 w-full text-sm outline-none" /></div>
                                        <div><label className="text-xs font-bold text-green-700">เวลาสิ้นสุด (ไม่บังคับ)</label><input type="time" value={eventEndTime} onChange={e=>setEventEndTime(e.target.value)} className="bg-white p-2 rounded-lg border border-green-200 w-full text-sm outline-none" /></div>
                                    </div>
                                    
                                    <div className="relative">
                                        <label className="text-xs font-bold text-green-700 block mb-1">ผู้เข้าร่วม (เลือกได้มากกว่า 1 คน)</label>
                                        <div className={`dropdown-header ${showParticipantDropdown ? 'open' : ''}`} onClick={(e) => { e.stopPropagation(); setShowParticipantDropdown(!showParticipantDropdown); }}>
                                            <span className="truncate flex-1">{eventParticipants.includes('ALL') ? '✅ ผู้ตรวจทุกคน' : `เลือกแล้ว ${eventParticipants.length} คน`}</span>
                                            <Icons.ChevronRight />
                                        </div>
                                        {showParticipantDropdown && (
                                            <div className="dropdown-body" onClick={(e) => e.stopPropagation()}>
                                                <label className="flex items-center gap-3 text-sm font-bold text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer mb-1">
                                                    <input type="checkbox" className="w-4 h-4 accent-green-600" checked={eventParticipants.includes('ALL')} onChange={handleEventParticipantChange} value="ALL" />
                                                    ✅ ผู้ตรวจทุกคน (ทั้งบริษัท)
                                                </label>
                                                {(db.inspectors || []).map(i => (
                                                    <label key={i.name} className={`flex items-center gap-3 text-sm p-3 rounded-lg cursor-pointer ${eventParticipants.includes('ALL') ? 'opacity-50 pointer-events-none' : (eventParticipants.includes(i.name) ? 'bg-green-50 border border-green-200 font-bold text-green-800' : 'hover:bg-slate-50 border border-transparent')}`}>
                                                        <input type="checkbox" className="w-4 h-4 accent-green-600" checked={eventParticipants.includes(i.name) || eventParticipants.includes('ALL')} onChange={handleEventParticipantChange} value={i.name} disabled={eventParticipants.includes('ALL')} />
                                                        👤 เฉพาะ: {i.name}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div><label className="text-xs font-bold text-green-700">ชื่อกิจกรรม</label><input type="text" name="event_name" required placeholder="เช่น อบรมความปลอดภัย" className="bg-white p-2 rounded-lg border border-green-200 w-full text-sm outline-none" /></div>
                                    
                                    {(eventStartDate && eventEndDate) && (
                                        <div className="p-3 bg-white border border-green-300 rounded-lg text-center shadow-sm">
                                            <div className="text-xs font-bold text-green-700 mb-1">ระยะเวลาจัดกิจกรรม (ไม่รวมวันอาทิตย์/หยุด)</div>
                                            <div className="text-2xl font-black text-green-600">
                                                {eventDates.length} <span className="text-sm font-bold">วัน</span>
                                            </div>
                                            {eventMins > 0 && <div className="text-xs text-green-600 font-bold mt-1 bg-green-50 p-1.5 rounded">เวลา: {formatDuration(eventMins)}/วัน <br/>(รวม: {formatDuration(eventDates.length * eventMins)})</div>}
                                        </div>
                                    )}
                                    <button disabled={loadingMsg || eventDates.length === 0 || eventParticipants.length === 0} className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${(eventDates.length > 0 && eventParticipants.length > 0) ? 'bg-green-600 text-white shadow-md' : 'bg-green-200 text-green-400'}`}>บันทึกกิจกรรม</button>
                                </div>
                            </form>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200 mt-4">
                                <div className="flex justify-between items-center mb-3 border-b border-green-100 pb-2">
                                    <h3 className="font-bold text-green-800">รายการกิจกรรมที่ตั้งไว้</h3>
                                    {selectedEventsToDelete.length > 0 && (
                                        <button onClick={() => handleBulkDelete('event', selectedEventsToDelete)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm font-bold flex items-center gap-1"><Icons.Trash /> ลบ ({selectedEventsToDelete.length})</button>
                                    )}
                                </div>
                                <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                                    {(db.bookings || []).filter(b => b.job_type === 'company_event' && String(b.status) !== 'cancelled').sort((a,b)=> new Date(b.date) - new Date(a.date)).map((h, i) => (
                                        <label key={i} className="flex justify-between items-center bg-green-50 p-2 rounded-lg border border-green-100 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600" checked={selectedEventsToDelete.includes(h.id)} onChange={(e) => { if(e.target.checked) setSelectedEventsToDelete([...selectedEventsToDelete, h.id]); else setSelectedEventsToDelete(selectedEventsToDelete.filter(id => id !== h.id)); }} />
                                                <div>
                                                    <div className="text-[10px] font-bold text-green-800">{h.date ? String(h.date).split('T')[0] : ''} | {h.inspector_name === 'SYSTEM_EVENT' ? 'ทุกคน' : h.inspector_name}</div>
                                                    <div className="text-xs text-green-700 font-bold">{h.site_name}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <button type="button" onClick={(e) => { e.preventDefault(); setModal({ type: 'edit_special', data: h }); }} className="text-blue-500 p-1.5 bg-white rounded shadow-sm border border-blue-100"><Icons.Edit /></button>
                                                <button type="button" onClick={(e) => { e.preventDefault(); handleCancelBooking(h); }} className="text-red-500 p-1.5 bg-white rounded shadow-sm border border-red-100"><Icons.X /></button>
                                            </div>
                                        </label>
                                    ))}
                                    {(db.bookings || []).filter(b => b.job_type === 'company_event' && String(b.status) !== 'cancelled').length === 0 && <div className="text-xs text-slate-400 text-center py-2">ไม่มีข้อมูลกิจกรรม</div>}
                                </div>
                            </div>
                        </div>
                    )}

                    {adminTab === 'holidays' && (
                        <div className="animate-pop space-y-4 pb-10">
                            <form onSubmit={async (e) => {
                                e.preventDefault(); const fd = new FormData(e.target);
                                if (holidayDates.length === 0) return setAlertMsg('ไม่มีวันที่สามารถตั้งค่าได้');
                                const hName = fd.get('h_name');
                                setConfirmDialog({
                                    msg: `ยืนยันตั้งค่าวัดหยุด: ${hName} จำนวน ${holidayDates.length} วัน?`,
                                    onConfirm: async () => {
                                        setConfirmDialog(null);
                                        const payload = { action: 'create_multiple_bookings', dates: holidayDates, inspector_name: 'SYSTEM_HOLIDAY', job_type: 'public_holiday', site_name: hName, equipment_no: `HLD_${Date.now()}`, user: user.username };
                                        const ok = await apiAction(payload, 'กำลังเพิ่มวันหยุด...');
                                        if(ok) { setSuccessModal('เพิ่มวันหยุดสำเร็จ'); setHolidayStartDate(''); setHolidayEndDate(''); e.target.reset(); }
                                    }
                                });
                            }} className="bg-red-50 p-4 rounded-xl shadow-sm border border-red-200">
                                <h3 className="font-bold text-red-800 mb-3 border-b border-red-200 pb-2">➕ ระบุวันหยุดนักขัตฤกษ์</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div><label className="text-xs font-bold text-red-700">จากวันที่</label><input type="date" value={holidayStartDate} onChange={e=>setHolidayStartDate(e.target.value)} required className="bg-white p-2 rounded-lg border border-red-200 w-full text-sm outline-none" /></div>
                                        <div><label className="text-xs font-bold text-red-700">ถึงวันที่</label><input type="date" value={holidayEndDate} onChange={e=>setHolidayEndDate(e.target.value)} required className="bg-white p-2 rounded-lg border border-red-200 w-full text-sm outline-none" /></div>
                                    </div>
                                    <div><label className="text-xs font-bold text-red-700">ชื่อวันหยุด</label><input type="text" name="h_name" required placeholder="เช่น วันสงกรานต์" className="bg-white p-2 rounded-lg border border-red-200 w-full text-sm outline-none" /></div>
                                    {(holidayStartDate && holidayEndDate) && (
                                        <div className="p-3 bg-white border border-red-300 rounded-lg text-center shadow-sm">
                                            <div className="text-xs font-bold text-red-700 mb-1">รวมวันหยุดทั้งหมด (ไม่นับวันอาทิตย์)</div>
                                            <div className="text-2xl font-black text-red-600">{holidayDates.length} <span className="text-sm font-bold">วัน</span></div>
                                        </div>
                                    )}
                                    <button disabled={loadingMsg || holidayDates.length === 0} className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all ${holidayDates.length > 0 ? 'bg-red-600 text-white shadow-md' : 'bg-red-200 text-red-400'}`}>บันทึกวันหยุด</button>
                                </div>
                            </form>

                            <div className="bg-white p-4 rounded-xl shadow-sm border border-red-200 mt-4">
                                <div className="flex justify-between items-center mb-3 border-b border-red-100 pb-2">
                                    <h3 className="font-bold text-red-800">รายการวันหยุดที่ตั้งไว้</h3>
                                    {selectedHolidaysToDelete.length > 0 && (
                                        <button onClick={() => handleBulkDelete('holiday', selectedHolidaysToDelete)} className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm font-bold flex items-center gap-1"><Icons.Trash /> ลบ ({selectedHolidaysToDelete.length})</button>
                                    )}
                                </div>
                                <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1">
                                    {(db.bookings || []).filter(b => b.job_type === 'public_holiday' && String(b.status) !== 'cancelled').sort((a,b)=> new Date(b.date) - new Date(a.date)).map((h, i) => (
                                        <label key={i} className="flex justify-between items-center bg-red-50 p-2 rounded-lg border border-red-100 cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <input type="checkbox" className="w-4 h-4 accent-red-600" checked={selectedHolidaysToDelete.includes(h.id)} onChange={(e) => { if(e.target.checked) setSelectedHolidaysToDelete([...selectedHolidaysToDelete, h.id]); else setSelectedHolidaysToDelete(selectedHolidaysToDelete.filter(id => id !== h.id)); }} />
                                                <div>
                                                    <div className="text-[10px] font-bold text-red-800">{h.date ? String(h.date).split('T')[0] : ''}</div>
                                                    <div className="text-xs text-red-700 font-bold">{h.site_name}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <button type="button" onClick={(e) => { e.preventDefault(); setModal({ type: 'edit_special', data: h }); }} className="text-blue-500 p-1.5 bg-white rounded shadow-sm border border-blue-100"><Icons.Edit /></button>
                                                <button type="button" onClick={(e) => { e.preventDefault(); handleCancelBooking(h); }} className="text-red-500 p-1.5 bg-white rounded shadow-sm border border-red-100"><Icons.X /></button>
                                            </div>
                                        </label>
                                    ))}
                                    {(db.bookings || []).filter(b => b.job_type === 'public_holiday' && String(b.status) !== 'cancelled').length === 0 && <div className="text-xs text-slate-400 text-center py-2">ไม่มีข้อมูลวันหยุด</div>}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 📍 [ข้อ 5] แก้อาการเวลาเพี้ยน บังคับ Timezone ประเทศไทย */}
            {showActivityModal && (
                <div className="backdrop z-[200]">
                    <div className="modal-card p-6 h-[85vh]">
                        <button onClick={() => setShowActivityModal(false)} className="btn-close-modern"><Icons.X /></button>
                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">ความเคลื่อนไหวในระบบ</h3>
                        
                        <div className="flex gap-2 mb-4 bg-slate-100 p-1 rounded-lg">
                            <button onClick={() => setActivityTab('notif')} className={`flex-1 py-2 text-xs font-bold rounded-md ${activityTab === 'notif' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>แจ้งเตือน</button>
                            <button onClick={() => setActivityTab('logs')} className={`flex-1 py-2 text-xs font-bold rounded-md ${activityTab === 'logs' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>ประวัติระบบ</button>
                        </div>

                        <div className="overflow-y-auto flex-1 pr-2 space-y-3">
                            {activityTab === 'notif' && (
                                <>
                                    {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).map((n, i) => (
                                        <div key={i} onClick={() => markNotifAsRead(n.id)} className={`p-3 rounded-xl border cursor-pointer transition-all ${String(n.isRead) === 'true' ? 'bg-slate-50 border-slate-200 opacity-70' : 'bg-blue-50 border-blue-200 shadow-sm'}`}>
                                            <div className="text-xs text-slate-800">{n.message}</div>
                                            <div className="text-[9px] text-slate-400 mt-1 text-right">{new Date(n.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</div>
                                        </div>
                                    ))}
                                    {(db.notifications || []).filter(n => n.target === user?.username || (isAdmin && n.target === 'ALL_ADMIN')).length === 0 && <p className="text-center text-slate-400 text-sm py-10">ไม่มีข้อความใหม่</p>}
                                </>
                            )}
                            
                            {activityTab === 'logs' && (
                                <>
                                    {(db.logs || []).slice(0, logsLimit).map((log, i) => (
                                        <div key={i} className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                                                <span className="flex items-center gap-1 text-slate-600"><Icons.User /> {log.user}</span>
                                                <span>{new Date(log.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <div className="text-xs font-bold text-slate-800">
                                                <span className={`px-2 py-0.5 rounded text-[9px] mr-2 ${log.action.includes('CREATE') || log.action.includes('BOOKING') || log.action.includes('SET') ? 'bg-green-100 text-green-700' : log.action.includes('UPDATE') ? 'bg-blue-100 text-blue-700' : log.action.includes('CANCEL') || log.action.includes('DELETE') ? 'bg-orange-100 text-orange-700' : 'bg-slate-200 text-slate-700'}`}>
                                                    {log.action}
                                                </span>
                                            </div>
                                            <div className="text-[11px] mt-2 text-slate-600 leading-relaxed whitespace-pre-wrap border-l-2 border-slate-300 pl-2">
                                                {log.details}
                                            </div>
                                        </div>
                                    ))}
                                    {logsLimit < (db.logs || []).length && (
                                        <button onClick={() => setLogsLimit(prev => prev + 20)} className="w-full py-2 bg-slate-200 text-slate-700 font-bold rounded-lg text-xs mt-2">
                                            โหลดประวัติเพิ่มเติม...
                                        </button>
                                    )}
                                </>
                            )}
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
                                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1">👨‍💻 สำหรับบุคคลทั่วไป</h4>
                                <ul className="list-decimal pl-4 text-xs space-y-2 text-slate-600">
                                    <li>ดูตารางวันว่างของผู้ตรวจสอบแต่ละท่านได้แบบ Real-time</li>
                                    <li>หากต้องการจองคิว ให้กดปุ่ม <b className="text-red-600">LOGIN</b> มุมขวาบน เพื่อสมัครสมาชิก รอแอดมินอนุมัติ</li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-1">📋 สำหรับพนักงาน (การจองคิว)</h4>
                                <ul className="list-decimal pl-4 text-xs space-y-2 text-blue-800">
                                    <li><b>การจอง:</b> แตะที่ <b className="text-red-600">ช่องว่างสีขาว</b> ในตาราง ให้ตรงกับวันและชื่อผู้ตรวจ</li>
                                    <li><b>การจัดการ:</b> ไปที่แท็บ "งานของฉัน" กดจุด 3 จุด มุมขวาบนเพื่อแก้ไขหรือยกเลิกคิว (ระบบจะให้ระบุเหตุผลเสมอ)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
