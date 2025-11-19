
export const API_BASE_URL = "https://holographicdocs.vercel.app/api/v1/components";

export interface ApiResponse {
  id: string;
  url: string;
  method: string;
  status: string;
}

export const getComponentApiUrl = (componentId: string): string => {
  return `${API_BASE_URL}/${componentId}`;
};

export const simulateApiCall = async (componentId: string): Promise<ApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: componentId,
        url: getComponentApiUrl(componentId),
        method: "GET",
        status: "200 OK"
      });
    }, 500);
  });
};
