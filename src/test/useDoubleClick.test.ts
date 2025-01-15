import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDoubleClick } from "../hooks/useDoubleClick";

const CLICK_DELAY = 300;

describe("useDoubleClick", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should not set likeId on single tap", () => {
    const { result } = renderHook(() => useDoubleClick());
    
    act(() => {
      result.current.handleDoubleTap(1);
    });

    expect(result.current.likeId).toBeNull();
  });

  it("should set likeId on double tap within delay", () => {
    const { result } = renderHook(() => useDoubleClick());
    
    // กดครั้งที่ 1
    act(() => {
      result.current.handleDoubleTap(1);
    });

    // กดครั้งที่ 2
    act(() => {
      result.current.handleDoubleTap(1);
    });

    expect(result.current.likeId).toBe(1);
  });

  it("should reset likeId after timeout", () => {
    const { result } = renderHook(() => useDoubleClick());
    
    // กด 2 ครั้งติดกัน
    act(() => {
      result.current.handleDoubleTap(1);
      result.current.handleDoubleTap(1);
    });

    expect(result.current.likeId).toBe(1);

    // ตั้งเวลาให้ timeout
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(result.current.likeId).toBeNull();
  });

  it("should not set likeId when taps are outside delay window", () => {
    const { result } = renderHook(() => useDoubleClick());
    
    // กดครั้งที่ 1
    act(() => {
      result.current.handleDoubleTap(1);
    });

    // เพิ่มเวลา delay
    act(() => {
      vi.advanceTimersByTime(CLICK_DELAY + 100);
    });

    // กดครั้งที่ 2 หลังเวลา delay ใหม่
    act(() => {
      result.current.handleDoubleTap(1);
    });

    expect(result.current.likeId).toBeNull();
  });
});