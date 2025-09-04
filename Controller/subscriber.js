import subscriberModal from "../Models/subscriber.js";

// Add a subscriber
export const addsubscriber = async (req, res) => {
  const { fullname, email } = req.body;

  try {

    if (!fullname || !email) {
      return res.status(400).json({ success: false, message: "Full name and email are required" });
    }

    const result = await subscriberModal.create({ fullname, email });
    res.status(201).json({ success: true, message: "subscriber added successfully", result });
  } catch (error) {
    console.error("Error adding subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to add subscriber" });
  }
};

// Get all subscribers
export const getAllsubscribers = async (req, res) => {
  try {
    const subscribers = await subscriberModal.find();
    res.status(200).json({ success: true, subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    res.status(500).json({ success: false, message: "Failed to fetch subscribers" });
  }
};

// Delete a subscriber
export const deletesubscriber = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const result = await subscriberModal.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: "subscriber deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "subscriber not found" });
    }
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to delete subscriber" });
  }
};
 
// Update a subscriber
export const updatesubscriber = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  console.log(id)
  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const result = await subscriberModal.updateOne(
      { _id: id },
      { $set: req.body },
    );

    if (result) {
      console.log('hogaya updated successfully')
      res.status(200).json({ success: true, message: "subscriber updated successfully" });
    } else {
      console.log('not hogaya updated successfully')

      res.status(404).json({ success: false, message: "subscriber not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to update subscriber" });
  }
};

// Get a single subscriber by ID
export const getSinglesubscriber = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const subscriber = await subscriberModal.findById(id);

    if (subscriber) {
      res.status(200).json({ success: true, subscriber });
    } else {
      res.status(404).json({ success: false, message: "subscriber not found" });
    }
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    res.status(500).json({ success: false, message: "Failed to fetch subscriber" });
  }
};
