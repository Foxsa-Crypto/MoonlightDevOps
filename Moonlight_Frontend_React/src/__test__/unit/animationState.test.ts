import { describe, it, expect } from "vitest";
import { getAnimationState } from "../../utils/ui/animation/animationState";


describe("getAnimationState", () => {
  it("retorna valores corretos quando ativo", () => {
    const result = getAnimationState(true);

    expect(result.styles.rotate).toBe("rotate-45");
    expect(result.styles.pointer).toBe("pointer-events-auto");
  });

  it("retorna valores corretos quando inativo", () => {
    const result = getAnimationState(false);

    expect(result.styles.rotate).toBe("rotate-0");
    expect(result.styles.pointer).toBe("pointer-events-none");
  });
});