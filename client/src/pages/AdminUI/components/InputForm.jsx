import { useState } from "react";
import { createAnnouncement } from "../../../hooks/UseAnnouncementRouteHooks";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [expires, setExpires] = useState("");

  const { mutate, isLoading } = createAnnouncement();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { title, content, category, priority, status, expires };

    console.log("Submitting:", data);

    mutate(data);
    setTitle("");
    setContent("");
    setCategory("");
    setPriority("");
    setStatus("");
    setExpires("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input
          type="text"
          className="input w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </fieldset>

      {/* Content */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Content</legend>
        <input
          type="text"
          className="input w-full"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </fieldset>

      {/* Category */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Category</legend>
        <select
          value={category}
          className="select w-full"
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option disabled value="">
            Select Category
          </option>
          <option value="General">General</option>
          <option value="Meeting">Meeting</option>
          <option value="Emergency">Emergency</option>
          <option value="Event">Event</option>
          <option value="Curfew">Curfew</option>
        </select>
      </fieldset>

      {/* Priority */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Priority</legend>
        <select
          value={priority}
          className="select w-full"
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option disabled value="">
            Select Priority
          </option>
          <option value="Normal">Normal</option>
          <option value="Important">Important</option>
          <option value="Urgent">Urgent</option>
        </select>
      </fieldset>

      {/* Status */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Status</legend>
        <select
          value={status}
          className="select w-full"
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option disabled value="">
            Select Status
          </option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
      </fieldset>

      {/* Expiration */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Expiration</legend>
        <input
          type="date"
          className="input w-full"
          value={expires}
          onChange={(e) => setExpires(e.target.value)}
        />
      </fieldset>

      {/* Submit */}
      <button
        className="btn btn-soft btn-primary max-w-full mt-4"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default InputForm;
