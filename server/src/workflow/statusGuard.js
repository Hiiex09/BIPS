export const statusGuard = (req, res, next) => {
  const { currentStatus, newStatus } = req;

  const allowedTransitions = {
    Pending: ["Approved"],
    Approved: ["Ready for Pickup"],
  };

  if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status transition" });
  }

  next();
};
