import Problems from "../models/ProblemsTable.js";

export const ProblemsTable = async (req, res) => {
    try{
        const problems = await Problems.find();
        res.status(200).json({data: problems });
    } catch (error) {
        res.status(500).json({message: "An error occurred", error: error.message});
    }
};