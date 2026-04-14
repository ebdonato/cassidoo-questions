import { describe, expect, it } from "bun:test";
import { resolvePath } from "./index";

describe("resolvePath tests", () => {
  describe("question scenarios", () => {
    const fs = {
      "/a": "/b",
      "/b": "/c",
      "/c": null,
      "/loop1": "/loop2",
      "/loop2": "/loop1",
      "/real": null,
      "/alias": "/real",
    };

    it("resolves a multi-hop symlink chain", () => {
      expect(resolvePath(fs, "/a")).toBe("/c");
    });

    it("resolves a single-hop symlink", () => {
      expect(resolvePath(fs, "/alias")).toBe("/real");
    });

    it("returns null for a two-node cycle", () => {
      expect(resolvePath(fs, "/loop1")).toBe(null);
      expect(resolvePath(fs, "/loop2")).toBe(null);
    });

    it("returns the path itself when it is already a real file", () => {
      expect(resolvePath(fs, "/real")).toBe("/real");
      expect(resolvePath(fs, "/c")).toBe("/c");
    });

    it("throws an error for non-existent paths", () => {
      expect(() => resolvePath(fs, "/nonexistent")).toThrow(
        'Path "/nonexistent" does not exist in the configuration.',
      );
    });
  });

  describe("cycle detection", () => {
    it("returns null for a self-referencing symlink", () => {
      const fs = { "/self": "/self" };
      expect(resolvePath(fs, "/self")).toBe(null);
    });

    it("returns null for a three-node cycle", () => {
      const fs = { "/x": "/y", "/y": "/z", "/z": "/x" };
      expect(resolvePath(fs, "/x")).toBe(null);
      expect(resolvePath(fs, "/y")).toBe(null);
      expect(resolvePath(fs, "/z")).toBe(null);
    });
  });

  describe("long chains", () => {
    it("resolves a long symlink chain to the terminal node", () => {
      const fs: Record<string, string | null> = {};
      for (let i = 0; i < 9; i++) {
        fs[`/n${i}`] = `/n${i + 1}`;
      }
      fs["/n9"] = null;
      expect(resolvePath(fs, "/n0")).toBe("/n9");
    });
  });

  describe("minimal file system", () => {
    it("resolves a single real file to itself", () => {
      expect(resolvePath({ "/only": null }, "/only")).toBe("/only");
    });

    it("throws when the file system is empty", () => {
      expect(() => resolvePath({}, "/any")).toThrow(
        'Path "/any" does not exist in the configuration.',
      );
    });
  });

  describe("symlink pointing to a non-existent target", () => {
    it("throws when a symlink target does not exist in the config", () => {
      const fs = { "/broken": "/missing" };
      expect(() => resolvePath(fs, "/broken")).toThrow(
        'Path "/missing" does not exist in the configuration.',
      );
    });
  });
});
