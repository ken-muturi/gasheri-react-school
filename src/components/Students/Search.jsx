import React, { useEffect, useState } from "react";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const { setStudents, showError } = props;

  useEffect(() => {
    if (search.length > 2) {
      const handleSubmit = () => {
        fetch(`http://localhost:3000/api/students/search?q=${search}`)
          .then(async (res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              const data = await res.json();
              throw new Error(data.error);
            }
          })
          .then((data) => {
            setStudents(data);
          })
          .catch((e) => {
            showError(e.message);
          });
      };
      handleSubmit();
    }
  }, [search, setStudents]);

  return (
    <div class="form-floating mb-3">
      <div className="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          name="q"
          placeholder="Search"
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label for="floatingInput">Search</label>
      </div>
    </div>
  );
};

export default Search;
