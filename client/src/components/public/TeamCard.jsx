const TeamCard = ({ name, position, image, description }) => {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300">
      <figure className="px-6 pt-6">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-base-200">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary/20">
              {name.charAt(0)}
            </div>
          )}
        </div>
      </figure>
      <div className="card-body items-center text-center">
        <h3 className="card-title text-2xl">{name}</h3>
        <p className="text-primary font-semibold">{position}</p>
        {description && <p className="opacity-80 mt-2">{description}</p>}
      </div>
    </div>
  );
};

export default TeamCard;
