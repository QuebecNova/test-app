import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Posts, Post, Albums, Album, Todos, NotFound } from "./pages";

export function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/post" element={<Post />} />
      <Route path="/albums" element={<Albums />} />
      <Route path="/album" element={<Album />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  );
}
