import Incident from "../model/incident_model.js";

const populateIncident = (query) =>
  query
    .populate("residentId", "firstName lastName email mobile address")
    .populate("assignedTo", "firstName lastName");

export const createIncident = async (req, res) => {
  try {
    const { category, subject, description, location } = req.body;

    if (!category || !subject || !description) {
      return res.status(400).json({
        message: "Category, subject, and description are required",
      });
    }

    const incident = await Incident.create({
      residentId: req.user.id,
      category,
      subject,
      description,
      location,
    });

    res.status(201).json({
      message: "Concern submitted successfully",
      incident,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit concern",
      error: error.message,
    });
  }
};

export const getMyIncidents = async (req, res) => {
  try {
    const incidents = await populateIncident(
      Incident.find({ residentId: req.user.id }).sort({ createdAt: -1 }),
    );

    res.status(200).json({ incidents });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your concerns",
      error: error.message,
    });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const { status, category, priority, search } = req.query;
    const filter = {};

    if (status && status !== "all") filter.status = status;
    if (category && category !== "all") filter.category = category;
    if (priority && priority !== "all") filter.priority = priority;

    let incidents = await populateIncident(Incident.find(filter).sort({ createdAt: -1 }));

    if (search) {
      const term = search.toLowerCase();
      incidents = incidents.filter((incident) => {
        const resident = incident.residentId;
        const fullName = `${resident?.firstName || ""} ${resident?.lastName || ""}`.toLowerCase();
        return (
          fullName.includes(term) ||
          incident.subject.toLowerCase().includes(term) ||
          incident.description.toLowerCase().includes(term) ||
          incident.location?.toLowerCase().includes(term)
        );
      });
    }

    res.status(200).json({ incidents });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch incidents",
      error: error.message,
    });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const { status, priority, assignedTo, resolutionNotes } = req.body;
    const update = {};

    if (status) update.status = status;
    if (priority) update.priority = priority;
    if (assignedTo !== undefined) update.assignedTo = assignedTo || undefined;
    if (resolutionNotes !== undefined) update.resolutionNotes = resolutionNotes;

    const incident = await Incident.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({
      message: "Incident updated successfully",
      incident,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update incident",
      error: error.message,
    });
  }
};
