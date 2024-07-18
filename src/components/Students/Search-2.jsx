import React from "react";

const Search = (props) => {
  const { setSearch } = props;
  return (
    <div className="form-floating mb-3">
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          name="q"
          placeholder="Search 2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="floatingInput">Search 2</label>
      </div>
    </div>
  );
};

export default Search;
