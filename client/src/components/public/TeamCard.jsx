const TeamCard = ({ name, position, image, description }) => (
  <article>
    <div className="aspect-[4/5] overflow-hidden rounded-sm bg-base-300">
      {image ? (
        <img src={image} alt={name} loading="lazy" className="h-full w-full object-cover grayscale-[35%]" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-primary/30">
          {name.charAt(0)}
        </div>
      )}
    </div>
    <h3 className="type-heading mt-4">{name}</h3>
    <p className="mt-0.5 font-semibold text-primary">{position}</p>
    {description && <p className="mt-2 text-sm text-base-content/70">{description}</p>}
  </article>
);

export default TeamCard;
