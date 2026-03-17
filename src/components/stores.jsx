import { useEffect, useRef, useState } from "react";
import { stores } from "../../const/DummyStores";

const Stores = () => {
  const ITEMS_PER_LOAD = 30;

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const loaderRef = useRef(null);

  // Get unique dropdown values
  const areas = [...new Set(stores.map((s) => s.areas))];
  const categories = [...new Set(stores.map((s) => s.category))];

  // Filter stores
  const filteredStores = stores.filter((store) => {
    return (
      (selectedArea === "" || store.areas === selectedArea) &&
      (selectedCategory === "" || store.category === selectedCategory)
    );
  });

  // Reset visible items when filter changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
  }, [selectedArea, selectedCategory]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + ITEMS_PER_LOAD, filteredStores.length),
          );
        }
      },
      { threshold: 1 },
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [filteredStores.length]);

  return (
    <section className="stores">
      <p style={{ textAlign: "center", marginTop: "30px", fontSize: "25px" }}>
        V CARD பயன்படுத்தி கீழ்காணும் கடைகளில்
        <span style={{ fontSize: "30px", fontWeight: 700 }}>20%</span>
        வரை தள்ளுபடி பெறுங்கள்
      </p>

      <h2 style={{ marginTop: "20px" }}>கடை விபரங்கள்</h2>

      {/* Filters */}
      <div className="filter-container">
        <select
          className="filter-select"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
        >
          <option value="">All Areas</option>
          {areas.map((area, i) => (
            <option key={i} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Store Grid */}
      <div className="store-grid">
        {filteredStores.slice(0, visibleCount).map((store, index) => (
          <div className="store-card" key={index}>
            <div className="store-header">
              <h3>{store.name}</h3>

              {store.discount && (
                <span className="badge">{store.discount} </span>
              )}
            </div>

            <p style={{ whiteSpace: "pre-line" }}>{store.address}</p>

            <p>
              <b>கடை எண்:</b> {store.phone}
            </p>

            <div className="card-buttons">
              <a href={`tel:${store.phone}`} className="btn btn-call">
                📞 Call Store
              </a>

              <a href={store.map} target="_blank" className="btn btn-direction">
                🧭 Get Directions
              </a>
            </div>
          </div>
        ))}

        {visibleCount < filteredStores.length && (
          <div ref={loaderRef} style={{ height: 40, textAlign: "center" }}>
            Loading more stores...
          </div>
        )}
      </div>
    </section>
  );
};

export default Stores;
