import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const BASE_URL = import.meta.env.VITE_API_URL

describe('Pruebas en heroApi', () => {


  test('should be configure pointing to the testing server', () => {
    
    console.log(heroApi.defaults.baseURL)
    expect(heroApi.defaults.baseURL).toBeDefined();
    expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
    expect(heroApi.defaults.baseURL).toContain('3001');

  })
})