export const auth = {
    getProfile: async () => {
        const res = await fetch('/api/auth/profile'); // adjust endpoint to your backend
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        return { data };
    },
    updateProfile: async (payload) => {
        const res = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Failed to update profile');
        const data = await res.json();
        return { data };
    },
};