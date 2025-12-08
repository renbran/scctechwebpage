// SGC TECH AI - User Profile API
// Cloudflare Workers REST API with validation and error handling

// CORS headers for cross-origin requests
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
};

// Input validation helpers
const validators = {
    email: (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    phone: (phone) => {
        const regex = /^\+?[\d\s-]{10,}$/;
        return regex.test(phone);
    },
    uuid: (id) => {
        const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return regex.test(id);
    },
    required: (value) => value !== undefined && value !== null && value !== '',
    minLength: (value, min) => typeof value === 'string' && value.length >= min,
    maxLength: (value, max) => typeof value === 'string' && value.length <= max
};

// Error response helper
function errorResponse(message, status = 400, details = null) {
    return new Response(JSON.stringify({
        success: false,
        error: {
            message,
            status,
            details,
            timestamp: new Date().toISOString()
        }
    }), {
        status,
        headers: corsHeaders
    });
}

// Success response helper
function successResponse(data, status = 200) {
    return new Response(JSON.stringify({
        success: true,
        data,
        timestamp: new Date().toISOString()
    }), {
        status,
        headers: corsHeaders
    });
}

// Validate user profile input
function validateProfileInput(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate) {
        // Required fields for new profile
        if (!validators.required(data.email)) {
            errors.push({ field: 'email', message: 'Email is required' });
        }
        if (!validators.required(data.name)) {
            errors.push({ field: 'name', message: 'Name is required' });
        }
    }

    // Email validation
    if (data.email && !validators.email(data.email)) {
        errors.push({ field: 'email', message: 'Invalid email format' });
    }

    // Phone validation (optional)
    if (data.phone && !validators.phone(data.phone)) {
        errors.push({ field: 'phone', message: 'Invalid phone format. Use: +971XXXXXXXXX' });
    }

    // Name validation
    if (data.name) {
        if (!validators.minLength(data.name, 2)) {
            errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
        }
        if (!validators.maxLength(data.name, 100)) {
            errors.push({ field: 'name', message: 'Name must be less than 100 characters' });
        }
    }

    // Company validation (optional)
    if (data.company && !validators.maxLength(data.company, 200)) {
        errors.push({ field: 'company', message: 'Company name must be less than 200 characters' });
    }

    return errors;
}

// Supabase client helper
async function supabaseRequest(env, endpoint, method = 'GET', body = null) {
    const url = `${env.SUPABASE_URL}/rest/v1/${endpoint}`;
    const options = {
        method,
        headers: {
            'apikey': env.SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${env.SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal'
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Supabase error: ${error}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}

// Main request handler
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        // Handle CORS preflight
        if (method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // Route: GET /api/profile/:id
            if (path.match(/^\/api\/profile\/[\w-]+$/) && method === 'GET') {
                const id = path.split('/').pop();
                
                if (!validators.uuid(id)) {
                    return errorResponse('Invalid profile ID format', 400);
                }

                const profiles = await supabaseRequest(env, `profiles?id=eq.${id}&select=*`);
                
                if (!profiles || profiles.length === 0) {
                    return errorResponse('Profile not found', 404);
                }

                return successResponse(profiles[0]);
            }

            // Route: GET /api/profile?email=xxx
            if (path === '/api/profile' && method === 'GET') {
                const email = url.searchParams.get('email');
                
                if (!email) {
                    return errorResponse('Email parameter is required', 400);
                }

                if (!validators.email(email)) {
                    return errorResponse('Invalid email format', 400);
                }

                const profiles = await supabaseRequest(env, `profiles?email=eq.${encodeURIComponent(email)}&select=*`);
                
                if (!profiles || profiles.length === 0) {
                    return errorResponse('Profile not found', 404);
                }

                return successResponse(profiles[0]);
            }

            // Route: POST /api/profile - Create new profile
            if (path === '/api/profile' && method === 'POST') {
                let body;
                try {
                    body = await request.json();
                } catch (e) {
                    return errorResponse('Invalid JSON body', 400);
                }

                const validationErrors = validateProfileInput(body);
                if (validationErrors.length > 0) {
                    return errorResponse('Validation failed', 400, validationErrors);
                }

                const profileData = {
                    name: body.name,
                    email: body.email.toLowerCase(),
                    phone: body.phone || null,
                    company: body.company || null,
                    industry: body.industry || null,
                    created_at: new Date().toISOString()
                };

                const result = await supabaseRequest(env, 'profiles', 'POST', profileData);
                return successResponse(result[0], 201);
            }

            // Route: PUT /api/profile/:id - Update profile
            if (path.match(/^\/api\/profile\/[\w-]+$/) && method === 'PUT') {
                const id = path.split('/').pop();

                if (!validators.uuid(id)) {
                    return errorResponse('Invalid profile ID format', 400);
                }

                let body;
                try {
                    body = await request.json();
                } catch (e) {
                    return errorResponse('Invalid JSON body', 400);
                }

                const validationErrors = validateProfileInput(body, true);
                if (validationErrors.length > 0) {
                    return errorResponse('Validation failed', 400, validationErrors);
                }

                const updateData = {
                    ...(body.name && { name: body.name }),
                    ...(body.email && { email: body.email.toLowerCase() }),
                    ...(body.phone && { phone: body.phone }),
                    ...(body.company && { company: body.company }),
                    ...(body.industry && { industry: body.industry }),
                    updated_at: new Date().toISOString()
                };

                await supabaseRequest(env, `profiles?id=eq.${id}`, 'PATCH', updateData);
                return successResponse({ id, ...updateData });
            }

            // Route: DELETE /api/profile/:id
            if (path.match(/^\/api\/profile\/[\w-]+$/) && method === 'DELETE') {
                const id = path.split('/').pop();

                if (!validators.uuid(id)) {
                    return errorResponse('Invalid profile ID format', 400);
                }

                await supabaseRequest(env, `profiles?id=eq.${id}`, 'DELETE');
                return successResponse({ message: 'Profile deleted successfully' });
            }

            // Route: GET /api/health - Health check
            if (path === '/api/health') {
                return successResponse({
                    status: 'healthy',
                    service: 'SGC TECH AI Profile API',
                    version: '1.0.0'
                });
            }

            // 404 for unknown routes
            return errorResponse('Endpoint not found', 404);

        } catch (error) {
            console.error('API Error:', error);
            return errorResponse(
                'Internal server error',
                500,
                { message: error.message }
            );
        }
    }
};
