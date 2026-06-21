import ServiceCard from "./ServiceCard";

export default function ServicesGrid({ services, onServiceSelect }) {
  return (
    <div className="services-grid services-grid--dense">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} onClick={() => onServiceSelect(service)} />
      ))}
    </div>
  );
}
