import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ArrowLeft, 
    CalendarPlus, 
    Upload, 
    X, 
    Plus,
    Calendar,
    Clock,
    MapPin,
    Users,
    Tag,
    FileText,
    Link as LinkIcon,
    Globe,
    DollarSign,
    CheckCircle
} from "lucide-react";
import { MyContext } from '../App.jsx';
import { createEvent, uploadImage } from '../utils/api.js';

const AddEvent = () => {
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        eventType: "in-person",
        date: "",
        time: "",
        duration: "",
        location: "",
        virtualLink: "",
        maxParticipants: "",
        registrationDeadline: "",
        price: "",
        isPaid: false,
        tags: [],
        requirements: "",
        agenda: "",
        isPublic: true
    });
    const [currentTag, setCurrentTag] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const categories = [
        "Workshop",
        "Hackathon",
        "Webinar",
        "Conference",
        "Meetup",
        "Networking",
        "Training",
        "Competition",
        "Seminar",
        "Social Event",
        "Other"
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                context.openAlertBox('error', 'Image size should be less than 5MB');
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                context.openAlertBox('error', 'Please select a valid image file');
                return;
            }

            setImage(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Upload image (temporarily disabled)
            await uploadImageToCloudinary(file);
        }
    };

    const uploadImageToCloudinary = async (file) => {
        try {
            setUploadingImage(true);
            
            // TEMPORARY: Simulate upload without backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            context.openAlertBox('info', 'Image preview ready (upload disabled temporarily)');
            
            /* When backend is ready, uncomment this:
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await uploadImage('/api/upload/event-image', formData);
            
            if (response.success && response.imageUrl) {
                setUploadedImageUrl(response.imageUrl);
                context.openAlertBox('success', 'Image uploaded successfully!');
            } else {
                context.openAlertBox('error', response.message || 'Failed to upload image');
                setImage(null);
                setImagePreview(null);
            }
            */
        } catch (error) {
            console.error('Error uploading image:', error);
            // Temporarily disabled error message
        } finally {
            setUploadingImage(false);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
        setUploadedImageUrl("");
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag("");
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title.trim()) {
            context.openAlertBox('error', 'Please enter an event title');
            return;
        }

        if (!formData.description.trim()) {
            context.openAlertBox('error', 'Please enter an event description');
            return;
        }

        if (!formData.category) {
            context.openAlertBox('error', 'Please select a category');
            return;
        }

        if (!formData.date) {
            context.openAlertBox('error', 'Please select an event date');
            return;
        }

        if (!formData.time) {
            context.openAlertBox('error', 'Please select an event time');
            return;
        }

        if (formData.eventType !== 'virtual' && !formData.location.trim()) {
            context.openAlertBox('error', 'Please enter a location');
            return;
        }

        if (formData.eventType !== 'in-person' && !formData.virtualLink.trim()) {
            context.openAlertBox('error', 'Please enter a virtual meeting link');
            return;
        }

        try {
            setLoading(true);

            // Combine date and time into a single datetime string
            const startDateTime = `${formData.date}T${formData.time}`;

            // Prepare data for backend with correct field names
            const eventData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                domain: formData.category,
                event_type: formData.eventType,
                start_datetime: startDateTime, // Backend expects start_datetime
                location: formData.eventType === 'in-person' 
                    ? formData.location.trim() 
                    : (formData.eventType === 'hybrid' ? formData.location.trim() : ''),
                virtual_link: formData.eventType !== 'in-person' 
                    ? formData.virtualLink.trim() 
                    : '',
                tags: formData.tags,
                is_public: formData.isPublic
            };

            // Add optional fields only if they have values
            if (formData.duration) {
                eventData.duration = parseFloat(formData.duration);
            }

            if (formData.maxParticipants) {
                eventData.max_participants = parseInt(formData.maxParticipants);
            }

            if (formData.registrationDeadline) {
                eventData.registration_deadline = formData.registrationDeadline;
            }

            if (formData.isPaid && formData.price) {
                eventData.is_paid = true;
                eventData.price = parseFloat(formData.price);
            } else {
                eventData.is_paid = false;
                eventData.price = 0;
            }

            if (formData.requirements && formData.requirements.trim()) {
                eventData.requirements = formData.requirements.trim();
            }

            if (formData.agenda && formData.agenda.trim()) {
                eventData.agenda = formData.agenda.trim();
            }

            // Add uploaded image URL (temporarily disabled)
            if (uploadedImageUrl) {
                eventData.image_url = uploadedImageUrl;
            }

            // Debug log
            console.log('Sending event data:', JSON.stringify(eventData, null, 2));

            const res = await createEvent(eventData);

            console.log('Response:', res);

            if (res.success) {
                context.openAlertBox('success', 'Event created successfully!');
                navigate(`/events/${res.data._id}`);
            } else {
                const errorMessage = res.message || 'Failed to create event';
                console.error('Error response:', res);
                context.openAlertBox('error', errorMessage);
            }
        } catch (err) {
            console.error('Error creating event:', err);
            
            if (err.response?.data) {
                console.error('Backend error details:', err.response.data);
                const errorMsg = err.response.data.message || 
                                err.response.data.error || 
                                'Failed to create event';
                context.openAlertBox('error', errorMsg);
            } else {
                context.openAlertBox('error', 'An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate('/events')}
                        className="flex items-center gap-2 text-white bg-purple-500 hover:bg-purple-600 shadow-md transition rounded-full px-4 py-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 ml-4 flex items-center gap-2">
                        <CalendarPlus className="w-8 h-8 text-purple-600" />
                        Create New Event
                    </h1>
                </div>
                <p className="text-gray-600">
                    Organize an event and bring people together to learn, collaborate, and network!
                </p>
            </div>

            {/* Form */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    {/* Event Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter your event title"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Event Description */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Event Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows="5"
                            placeholder="Describe your event, what attendees will learn, and what to expect..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Category and Event Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                            >
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Globe className="w-4 h-4" />
                                Event Type *
                            </label>
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white cursor-pointer"
                            >
                                <option value="in-person">In-Person</option>
                                <option value="virtual">Virtual</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Event Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                Start Time *
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Duration (hours)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                placeholder="e.g., 2"
                                min="0.5"
                                step="0.5"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Location or Virtual Link */}
                    {formData.eventType !== 'virtual' && (
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required={formData.eventType !== 'virtual'}
                                placeholder="Enter venue address"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    )}

                    {formData.eventType !== 'in-person' && (
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <LinkIcon className="w-4 h-4" />
                                Virtual Meeting Link *
                            </label>
                            <input
                                type="url"
                                name="virtualLink"
                                value={formData.virtualLink}
                                onChange={handleInputChange}
                                required={formData.eventType !== 'in-person'}
                                placeholder="https://zoom.us/j/... or Google Meet link"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    )}

                    {/* Max Participants and Registration Deadline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Max Participants
                            </label>
                            <input
                                type="number"
                                name="maxParticipants"
                                value={formData.maxParticipants}
                                onChange={handleInputChange}
                                placeholder="e.g., 100"
                                min="1"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Registration Deadline
                            </label>
                            <input
                                type="date"
                                name="registrationDeadline"
                                value={formData.registrationDeadline}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                max={formData.date}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6">
                        <label className="flex items-center gap-3 cursor-pointer mb-3">
                            <input
                                type="checkbox"
                                checked={formData.isPaid}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    isPaid: e.target.checked
                                }))}
                                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                This is a paid event
                            </span>
                        </label>

                        {formData.isPaid && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required={formData.isPaid}
                                    placeholder="e.g., 50"
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Topics/Tags
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                placeholder="e.g., AI, Web Development, Networking"
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition px-6"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-2"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="hover:text-purple-900"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Requirements/Prerequisites
                        </label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Any requirements or things attendees should know beforehand..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Agenda */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Agenda/Schedule
                        </label>
                        <textarea
                            name="agenda"
                            value={formData.agenda}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Outline the event schedule and activities..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Event Image */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Event Banner/Image
                        </label>
                        {!imagePreview ? (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload event banner</span>
                                <span className="text-xs text-gray-400 mt-1">Max size: 5MB</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={uploadingImage}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Event preview"
                                    className="w-full h-64 object-cover rounded-xl"
                                />
                                {uploadingImage && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                                        <div className="text-white flex flex-col items-center gap-2">
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                                            <span>Uploading...</span>
                                        </div>
                                    </div>
                                )}
                                {!uploadingImage && (
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Privacy Toggle */}
                    <div className="mb-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isPublic}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    isPublic: e.target.checked
                                }))}
                                className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Make this event public (Visible to all users)
                            </span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/events')}
                            className="flex-1 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition py-3 font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading || uploadingImage}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition py-3 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Creating...
                                </>
                            ) : uploadingImage ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Uploading Image...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Create Event
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;