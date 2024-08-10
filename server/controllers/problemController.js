import Problems from "../models/ProblemsTable.js";
import ProblemDetails from "../models/ProblemDetails.js";

// Insert a new problem summary
export const createProblem = async (req, res) => {
    try {
        const { id, title, difficulty, category, order } = req.body;

        const newProblem = new Problems({
            id,
            title,
            difficulty,
            category,
            order,
        });

        await newProblem.save();
        res.status(201).json({ message: "Problem created successfully", problem: newProblem });
    } catch (error) {
        res.status(500).json({ message: "Failed to create problem", error: error.message });
    }
};

// Insert a new problem with full details
export const createProblemDetails = async (req, res) => {
    try {
        const { id, title, difficulty, category, order, description, examples, constraints } = req.body;

        const newProblemDetails = new ProblemDetails({
            id,
            title,
            difficulty,
            category,
            order,
            description,
            examples,
            constraints,
        });

        await newProblemDetails.save();
        res.status(201).json({ message: "Problem details created successfully", problemDetails: newProblemDetails });
    } catch (error) {
        res.status(500).json({ message: "Failed to create problem details", error: error.message });
    }
};
