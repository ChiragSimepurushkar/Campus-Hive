import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// ============================================
// GENERIC API UTILITIES
// ============================================

export const postData = async (url, formData) => {
    try {
        const response = await axios.post(
            apiUrl + url,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accesstoken")}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;

    } catch (error) {
        console.error("Error posting data:", error);

        // IMPORTANT: Return the error response data from backend
        if (error.response && error.response.data) {
            return error.response.data;  // This contains { error: true, message: "Invalid OTP" }
        }

        return {
            error: true,
            success: false,
            message: error.message || "Network error occurred"
        };
    }
};

export const fetchDataFromApi = async (url) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accesstoken")}`,
                'Content-Type': 'application/json',
            },
        };
        const { data } = await axios.get(apiUrl + url, params);

        return data;

    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            return error.response.data;
        }
        return {
            error: true,
            success: false,
            message: error.message || "Network error occurred"
        };
    }
};

export const uploadImage = async (url, updatedData) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'multipart/form-data',
            },
        };
        const response = await axios.put(apiUrl + url, updatedData, params);
        return response.data;

    } catch (error) {
        console.error("Error editing profile image:", error);

        // Standardized error response handling
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            message: error.message || "Network error occurred",
            error: true,
            success: false
        };
    }
};

export const editData = async (url, updatedData) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.put(apiUrl + url, updatedData, params);
        return response.data;

    } catch (error) {
        console.error("Error editing data:", error);

        // Standardized error response handling
        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            message: error.message || "Network error occurred",
            error: true,
            success: false
        };
    }
};

export const deleteData = async (url) => {
    try {
        const params = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accesstoken')}`,
                'Content-Type': 'application/json',
            },
        };
        const response = await axios.delete(apiUrl + url, params);
        return response.data;

    } catch (error) {
        console.error("Error deleting data:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        return {
            message: error.message || "Network error occurred",
            error: true,
            success: false
        };
    }
};

// ============================================
// PROJECT-SPECIFIC API CALLS
// ============================================

/**
 * Get all projects with optional filtering
 * @param {Object} filters - { tag, skill, search, status, limit, page }
 */
export const getProjects = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams();
        
        if (filters.tag) queryParams.append('tag', filters.tag);
        if (filters.skill) queryParams.append('skill', filters.skill);
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.limit) queryParams.append('limit', filters.limit);
        if (filters.page) queryParams.append('page', filters.page);

        const url = `/api/projects${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        return await fetchDataFromApi(url);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return {
            error: true,
            success: false,
            message: error.message || "Failed to fetch projects"
        };
    }
};

/**
 * Get a single project by ID
 * @param {string} projectId - The project ID
 */
export const getProjectById = async (projectId) => {
    return await fetchDataFromApi(`/api/projects/${projectId}`);
};

/**
 * Create a new project
 * @param {Object} projectData - { title, description, tags, required_skills, status }
 */
export const createProject = async (projectData) => {
    return await postData('/api/projects', projectData);
};

/**
 * Update a project
 * @param {string} projectId - The project ID
 * @param {Object} updatedData - Updated project data
 */
export const updateProject = async (projectId, updatedData) => {
    return await editData(`/api/projects/${projectId}`, updatedData);
};

/**
 * Delete a project
 * @param {string} projectId - The project ID
 */
export const deleteProject = async (projectId) => {
    return await deleteData(`/api/projects/${projectId}`);
};

// ============================================
// PROJECT MEMBERS API CALLS
// ============================================

/**
 * Get all members of a project
 * @param {string} projectId - The project ID
 */
export const getProjectMembers = async (projectId) => {
    return await fetchDataFromApi(`/api/members/${projectId}`);
};

/**
 * Request to join a project / Add member to project
 * @param {string} projectId - The project ID
 * @param {string} userId - The user ID to add (optional, uses logged-in user if not provided)
 */
export const addProjectMember = async (projectId, userId = null) => {
    const payload = { project_id: projectId };
    if (userId) {
        payload.user_id = userId;
    }
    return await postData('/api/members/add', payload);
};

/**
 * Remove a member from a project
 * @param {string} projectId - The project ID
 * @param {string} userId - The user ID to remove
 */
export const removeProjectMember = async (projectId, userId) => {
    return await deleteData('/api/members/remove', {
        project_id: projectId,
        user_id: userId
    });
};

// ============================================
// COMMENTS API CALLS
// ============================================

/**
 * Get all comments for a project
 * @param {string} projectId - The project ID
 */
export const getProjectComments = async (projectId) => {
    return await fetchDataFromApi(`/api/comments/${projectId}`);
};

/**
 * Create a comment on a project
 * @param {string} projectId - The project ID
 * @param {string} content - The comment content
 */
export const createComment = async (projectId, content) => {
    return await postData('/api/comments', {
        project_id: projectId,
        content: content
    });
};

/**
 * Delete a comment
 * @param {string} commentId - The comment ID
 */
export const deleteComment = async (commentId) => {
    return await deleteData(`/api/comments/${commentId}`);
};

// ============================================
// INTERACTIONS API CALLS (Upvotes & Bookmarks)
// ============================================

/**
 * Toggle upvote on a project
 * @param {string} projectId - The project ID
 */
export const toggleUpvote = async (projectId) => {
    return await postData('/api/interactions/upvote', { project_id: projectId });
};

/**
 * Get upvote status for a project
 * @param {string} projectId - The project ID
 */
export const getUpvoteStatus = async (projectId) => {
    return await fetchDataFromApi(`/api/interactions/upvote/status?project_id=${projectId}`);
};

/**
 * Toggle bookmark on a project
 * @param {string} projectId - The project ID
 */
export const toggleBookmark = async (projectId) => {
    return await postData('/api/interactions/bookmark', { project_id: projectId });
};

/**
 * Get user's bookmarked projects
 */
export const getUserBookmarks = async () => {
    return await fetchDataFromApi('/api/interactions/bookmarks/user');
};

// ============================================
// EVENTS API CALLS
// ============================================

/**
 * Get all events with optional filtering
 * @param {Object} filters - { domain, location, date, search, limit, page }
 */
export const getEvents = async (filters = {}) => {
    try {
        const queryParams = new URLSearchParams();
        
        if (filters.domain) queryParams.append('domain', filters.domain);
        if (filters.location) queryParams.append('location', filters.location);
        if (filters.date) queryParams.append('date', filters.date);
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.limit) queryParams.append('limit', filters.limit);
        if (filters.page) queryParams.append('page', filters.page);

        const url = `/api/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        return await fetchDataFromApi(url);
    } catch (error) {
        console.error("Error fetching events:", error);
        return {
            error: true,
            success: false,
            message: error.message || "Failed to fetch events"
        };
    }
};

/**
 * Get a single event by ID
 * @param {string} eventId - The event ID
 */
export const getEventById = async (eventId) => {
    return await fetchDataFromApi(`/api/events/${eventId}`);
};

/**
 * Create a new event
 * @param {Object} eventData - Event data
 */
export const createEvent = async (eventData) => {
    return await postData('/api/events', eventData);
};

/**
 * Update an event
 * @param {string} eventId - The event ID
 * @param {Object} updatedData - Updated event data
 */
export const updateEvent = async (eventId, updatedData) => {
    return await editData(`/api/events/${eventId}`, updatedData);
};

/**
 * Delete an event
 * @param {string} eventId - The event ID
 */
export const deleteEvent = async (eventId) => {
    return await deleteData(`/api/events/${eventId}`);
};

// ============================================
// NOTIFICATIONS API CALLS
// ============================================

/**
 * Get user notifications
 * @param {boolean} unreadOnly - Get only unread notifications
 */
export const getNotifications = async (unreadOnly = false) => {
    const url = unreadOnly 
        ? '/api/notifications?isRead=false' 
        : '/api/notifications';
    return await fetchDataFromApi(url);
};

/**
 * Mark a notification as read
 * @param {string} notificationId - The notification ID
 */
export const markNotificationAsRead = async (notificationId) => {
    return await editData(`/api/notifications/${notificationId}/read`, {});
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsAsRead = async () => {
    return await editData('/api/notifications/read-all', {});
};

// ============================================
// TEAM MATCHMAKING API CALLS
// ============================================

/**
 * Get team recommendations for a project
 * @param {string} projectId - The project ID
 */
export const getProjectRecommendations = async (projectId) => {
    return await fetchDataFromApi(`/api/matchmaking/project/${projectId}`);
};

/**
 * Get user project recommendations
 */
export const getUserProjectRecommendations = async () => {
    return await fetchDataFromApi('/api/matchmaking/user/projects');
};

// ============================================
// CHAT API CALLS (Future Implementation)
// ============================================

/**
 * Get chat room for a project
 * @param {string} projectId - The project ID
 */
export const getChatRoom = async (projectId) => {
    return await fetchDataFromApi(`/api/chat/rooms/${projectId}`);
};

/**
 * Get message history for a chat room
 * @param {string} roomId - The chat room ID
 * @param {Object} params - { limit, skip }
 */
export const getChatMessages = async (roomId, params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.skip) queryParams.append('skip', params.skip);
    
    const url = `/api/chat/messages/${roomId}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    return await fetchDataFromApi(url);
};

/**
 * Send a chat message
 * @param {string} roomId - The chat room ID
 * @param {string} content - The message content
 * @param {string} fileUrl - Optional file URL
 */
export const sendChatMessage = async (roomId, content, fileUrl = null) => {
    return await postData('/api/chat/messages', {
        room_id: roomId,
        content: content,
        file_url: fileUrl
    });
};

/**
 * Delete a chat message
 * @param {string} messageId - The message ID
 */
export const deleteChatMessage = async (messageId) => {
    return await deleteData(`/api/chat/messages/${messageId}`);
};