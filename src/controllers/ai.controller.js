const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    const code = req.body?.code;

    if (!code || typeof code !== 'string' || code.trim() === '') {
        return res.status(400).json({ error: "Code is required and must be a non-empty string" });
    }

    try {
        const response = await aiService(code.trim());
        res.send(response);
    } catch (error) {
        console.error('Error in getReview:', error);
        const errorMessage = error.message || 'Internal server error';
        
        // Check if it's an API key error
        if (errorMessage.includes('API key') || errorMessage.includes('API_KEY')) {
            return res.status(500).json({ 
                error: 'Invalid or missing Google Gemini API key. Please check your .env file.' 
            });
        }
        
        res.status(500).json({ error: errorMessage });
    }
}
