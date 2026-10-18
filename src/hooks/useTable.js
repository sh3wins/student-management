import { useState, useEffect } from "react";

export default function useTable(items, filterKey, perPage = 5) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [search, filter]);

  const q = search.toLowerCase();
  const filtered = items.filter(
    (i) => (i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q)) && (!filter || i[filterKey] === filter)
  );
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * perPage, current * perPage);
  return { search, setSearch, filter, setFilter, page: current, setPage, pages, rows, total: filtered.length };
}
