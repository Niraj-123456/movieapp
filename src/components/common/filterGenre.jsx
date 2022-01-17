import React from "react";

function FilterGenre(props) {
  const {
    genres,
    genreSelected,
    textProperty,
    valueProperty,
    onGenreSelected,
  } = props;
  return (
    <div>
      <ul className="list-group">
        {genres.map((genre) => (
          <li
            style={{ cursor: "pointer" }}
            key={genre[valueProperty]}
            onClick={() => onGenreSelected(genre)}
            className={
              genre === genreSelected
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {genre[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
}

FilterGenre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default FilterGenre;
