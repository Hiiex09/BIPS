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
    const { status, category, priority, search, page = 1, limit } = req.query;
    const filter = {};

    if (status && status !== "all") filter.status = status;
    if (category && category !== "all") filter.category = category;
    if (priority && priority !== "all") filter.priority = priority;

    if (search) {
      const q = new RegExp(search.trim(), "i");
      filter.$or = [
        { subject: q },
        { description: q },
        { location: q },
        { category: q },
      ];
    }

    const total = await Incident.countDocuments(filter);
    const query = Incident.find(filter).sort({ createdAt: -1 });

    if (limit) {
      const pageNum = Math.max(1, parseInt(page));
      const limitNum = Math.max(1, parseInt(limit));
      query.skip((pageNum - 1) * limitNum).limit(limitNum);
    }

    const incidents = await populateIncident(query);

    res.status(200).json({
      incidents,
      total,
      page: parseInt(page) || 1,
      totalPages: limit ? Math.ceil(total / parseInt(limit)) : 1,
    });
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
