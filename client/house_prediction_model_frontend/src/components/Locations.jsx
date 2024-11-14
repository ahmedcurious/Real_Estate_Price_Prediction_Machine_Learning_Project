import { useQuery } from "@tanstack/react-query";

const Locations = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:5000/get_location_names");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.locations?.map(
        (
          location,
          index // Access the 'locations' array and iterate
        ) => (
          <div key={index}>{location}</div>
        )
      )}
    </div>
  );
};


export default Locations;
