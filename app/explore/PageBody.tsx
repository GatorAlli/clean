import Card from "../components/card";

export default function PageBody() {
  return (
    <div>
      <Card
        name="Store Name"
        location="Location"
        about="Lorem Ipsum"
        pricing={[
          { apparelType: "shirt", unitPrice: 100 },
          { apparelType: "cloth", unitPrice: 100 },
        ]}
      />
    </div>
  );
}
