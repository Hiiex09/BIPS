import Certificate from "../model/cert_request_model.js";

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
