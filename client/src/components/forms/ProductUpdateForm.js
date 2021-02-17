import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  // destructure
  const {
    title,
    artist,
    label,
    description,
    price,
    category,
    subs,
    quantity,
    sold,
    catno,
    sleeveCondition,
    mediaCondition,
    format,
    sleeveConditions,
    mediaConditions,
    formats,
    status,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Artist</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={artist}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={label}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      
      {/* <div className="form-group">
        <label>Shipping</label>
        <select
          value={shipping === "Yes" ? "Yes" : "No"}
          name="shipping"
          className="form-control"
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div> */}

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <input
          type="text"
          name="status"
          className="form-control"
          value={status}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Format</label>
        <select
          value={format}
          name="format"
          className="form-control"
          onChange={handleChange}
        >
          {formats.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Media Condition</label>
        <select
          value={mediaCondition}
          name="mediaCondition"
          className="form-control"
          onChange={handleChange}
        >
          {mediaConditions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>


      <div className="form-group">
        <label>Sleeve Condition</label>
        <select
          value={sleeveCondition}
          name="sleeveCondition"
          className="form-control"
          onChange={handleChange}
        >
          {sleeveConditions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {/* <div>
        <label>Sub Categories</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="Please select"
          value={arrayOfSubs}
          onChange={(value) => setArrayOfSubs(value)}
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div> */}

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ProductUpdateForm;
