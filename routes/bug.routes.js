const express = require("express")
const { BugModel } = require("../model/bug.model")



const bugRouter = express.Router()
bugRouter.post("/bugs", async (req, res) => {
    try {
        const bug = new BugModel(req.body)
        await bug.save()
        res.status(200).send({ "msg": "Bug successfully uploaded", "Bug": req.body })
    }
    catch (err) {
        res.send(err.message)
    }
})
bugRouter.get("/bugs", async (req, res) => {

    try {
        const bugs = await BugModel.find()
        res.status(200).send(bugs)
    }
    catch (err) {
        res.send(err.message)
    }
})
bugRouter.patch("/bugs/:id", async (req, res) => {
    const { id } = req.params
    const bug = await BugModel.findOne({ _id: id })
    try {
        await BugModel.findByIdAndUpdate({ _id: bug._id }, req.body)
        res.status(200).send({ "msg": "Bug successfully updated", "Bug": req.body })
    }
    catch (err) {
        res.send(err.message)
    }
})
bugRouter.patch("/bugs/:id", async (req, res) => {
    const { id } = req.params
    const bug = await BugModel.findOne({ _id: id })
    try {
        await BugModel.findByIdAndDelete({ _id: bug._id }, req.body)
        res.status(200).send({ "msg": "Bug successfully Deleted", "Bug": req.body })
    }
    catch (err) {
        res.send(err.message)
    }
})
bugRouter.patch("/bugs/updateOrder", async (req, res) => {
    try {
        const { bugs } = req.body;

        // Assuming bugs is an array of bug IDs in the desired order
        for (let i = 0; i < bugs.length; i++) {
            const bugId = bugs[i];
            await BugModel.findByIdAndUpdate(bugId, { order: i });
        }

        res.status(200).send({ msg: "Bug order successfully updated" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});
module.exports = { bugRouter }
