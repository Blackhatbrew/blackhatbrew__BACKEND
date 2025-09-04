import queryModal from "../Models/query.js";
 // Add a query
export const addquery = async (req, res) => {
  const { fullname, email } = req.body;

  try {

    if (!fullname || !email) {
      return res.status(400).json({ success: false, message: "Full name and email are required" });
    }

    const result = await queryModal.create({ fullname, email });
    res.status(201).json({ success: true, message: "query added successfully", result });
  } catch (error) {
    console.error("Error adding query:", error);
    res.status(500).json({ success: false, message: "Failed to add query" });
  }
};

// Get all querys
export const getAllquerys = async (req, res) => {
  try {
    const querys = await queryModal.find();
    res.status(200).json({ success: true, querys });
  } catch (error) {
    console.error("Error fetching querys:", error);
    res.status(500).json({ success: false, message: "Failed to fetch querys" });
  }
};

// Delete a query
export const deletequery = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const result = await queryModal.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: "query deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "query not found" });
    }
  } catch (error) {
    console.error("Error deleting query:", error);
    res.status(500).json({ success: false, message: "Failed to delete query" });
  }
};

// Update a query
export const updatequery = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  console.log(id)
  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const result = await queryModal.updateOne(
      { _id: id },
      { $set: req.body },
    );

    if (result) {
      console.log('hogaya updated successfully')
      res.status(200).json({ success: true, message: "query updated successfully" });
    } else {
      console.log('not hogaya updated successfully')

      res.status(404).json({ success: false, message: "query not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating query:", error);
    res.status(500).json({ success: false, message: "Failed to update query" });
  }
};

// Get a single query by ID
export const getSinglequery = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const query = await queryModal.findById(id);

    if (query) {
      res.status(200).json({ success: true, query });
    } else {
      res.status(404).json({ success: false, message: "query not found" });
    }
  } catch (error) {
    console.error("Error fetching query:", error);
    res.status(500).json({ success: false, message: "Failed to fetch query" });
  }
};

export const sendmail = async (req, res) => {
  const body = req.body;
  const jsonBody = JSON.stringify(body, null, 2);

  const subject = 'New   Request from Website';
  const message = `
    You have received a new quote request with the following details:
    
    ${jsonBody}

    Please review the details and follow up accordingly.
  `;

 
  
  try {
    await newQuoteRequest.save();

     res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};

 