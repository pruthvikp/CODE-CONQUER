import ProblemDetails from "../models/ProblemDetails.js";

export const problemDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const details = await ProblemDetails.findOne({ id });
         if (!details) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.status(200).json(details);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve problem details", error: error.message });
    }
};