// FeaturedContent.js
import React from "react";

const FeaturedContent = () => (
  <ul className="grid grid-cols-2 gap-4">
    {["X", "Y", "z", "a"].map((feature) => (
      <li
        key={feature}
        className="p-3 rounded-lg text-center bg-gray-700 text-text-dark transition-colors duration-300"
      >
        {feature}
      </li>
    ))}
  </ul>
);

export default FeaturedContent;
