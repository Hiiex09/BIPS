import Certificate from "../model/cert_request_model.js";

const populateRequest = (query) =>
  query
    .populate("residentId", "firstName lastName email mobile address")
    .populate("processedBy", "firstName lastName");

export const createCertificateRequest = async (req, res) => {
  try {
    const request = await Certificate.create({
      residentId: req.user.id,
      certificate_type: req.body.certificate_type,
      purpose: req.body.purpose,
      contactNumber: req.body.contactNumber,
      status: "Pending",
      dateRequested: new Date(),
    });

    res.status(201).json({
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to submit request",
      error: error.message,
    });
  }
};

export const getMyCertificateRequests = async (req, res) => {
  try {
    const requests = await populateRequest(
      Certificate.find({ residentId: req.user.id }).sort({ createdAt: -1 }),
    );

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your requests",
      error: error.message,
    });
  }
};

export const getAllCertificateRequests = async (req, res) => {
  try {
    const { status, certificate_type, search } = req.query;
    const filter = {};

    if (status && status !== "all") filter.status = status;
    if (certificate_type && certificate_type !== "all") {
      filter.certificate_type = certificate_type;
    }

    let requests = await populateRequest(Certificate.find(filter).sort({ createdAt: -1 }));

    if (search) {
      const term = search.toLowerCase();
      requests = requests.filter((request) => {
        const resident = request.residentId;
        const fullName = `${resident?.firstName || ""} ${resident?.lastName || ""}`.toLowerCase();
        return (
          fullName.includes(term) ||
          request.purpose.toLowerCase().includes(term) ||
          request.certificate_type.toLowerCase().includes(term)
        );
      });
    }

    res.status(200).json({ requests });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
};

export const approveRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const request = await Certificate.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot approve request with status '${request.status}'`,
      });
    }

    request.status = "Approved";
    request.dateApproved = new Date();
    request.processedBy = req.user.id;
    request.remarks = req.body?.remarks || "";

    await request.save();

    res.json({
      message: "Request approved",
      request,
    });
  } catch (error) {
    console.error("Error approving request:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const requestReady = async (req, res) => {
  const requestId = req.params.id;
  try {
    const request = await Certificate.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Approved")
      return res.status(400).json({
        message: `Cannot mark request as ready with status '${request.status}'`,
      });

    request.status = "Ready for Pickup";
    request.dateReady = new Date();
    request.remarks = req.body?.remarks || request.remarks;

    await request.save();

    res.json({
      message: "Request marked as Ready for Pickup",
      request,
    });
  } catch (error) {
    console.error("Error approving request:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const rejectRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    const request = await Certificate.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        message: `Cannot reject request with status '${request.status}'`,
      });
    }

    request.status = "Rejected";
    request.processedBy = req.user.id;
    request.remarks = req.body?.remarks || "Request rejected";

    await request.save();

    res.json({
      message: "Request rejected",
      request,
    });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
