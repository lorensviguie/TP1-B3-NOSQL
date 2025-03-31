import type { Request, Response } from "express";
import { User } from "./model";

export async function getProfiles(req: Request, res: Response) {
    const profiles = await User.find({ deleted: { $ne: true } });
    res.json(profiles);
}

export async function getProfileById(req: Request, res: Response) {
    const profile = await User.findById(req.params.id);
    profile ? res.json(profile) : res.status(404).send("Profile not found");
}

export async function createProfile(req: Request, res: Response) {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
}

export async function updateProfile(req: Request, res: Response) {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updatedUser ? res.json(updatedUser) : res.status(404).send("Profile not found");
}

export async function deleteProfile(req: Request, res: Response) {
    const deletedUser = await User.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    deletedUser ? res.json(deletedUser) : res.status(404).send("Profile not found");
}

export async function addExperience(req: Request, res: Response) {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { experience: req.body } },
        { new: true }
    );
    updatedUser ? res.json(updatedUser) : res.status(404).send("Profile not found");
}

export async function deleteExperience(req: Request, res: Response) {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { experience: { _id: req.params.exp } } },
        { new: true }
    );
    updated ? res.json(updated) : res.status(404).send("Profile not found");
}

export async function addSkill(req: Request, res: Response) {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { skills: req.body.skill } },
        { new: true }
    );
    updated ? res.json(updated) : res.status(404).send("Profile not found");
}

export async function deleteSkill(req: Request, res: Response) {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { skills: req.params.skill } },
        { new: true }
    );
    updated ? res.json(updated) : res.status(404).send("Profile not found");
}

export async function updateInformation(req: Request, res: Response) {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        { information: req.body },
        { new: true }
    );
    updated ? res.json(updated) : res.status(404).send("Profile not found");
}
