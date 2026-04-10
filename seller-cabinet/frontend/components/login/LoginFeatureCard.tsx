type LoginFeatureCardProps = {
  icon: string;
  step: string;
  title: string;
  lines: string[];
};

export function LoginFeatureCard({ icon, step, title, lines }: LoginFeatureCardProps) {
  return (
    <article className="card loginFeatureCard">
      <div className="featureStepBadge">{step}</div>
      <div className="loginFeatureBody">
        <div className="loginFeatureText">
          <div className="loginFeatureIcon" aria-hidden>
            {icon}
          </div>
          <div>
            <h3>{title}</h3>
            <ul>
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="featureMedia" aria-hidden>
          <span>preview</span>
        </div>
      </div>
    </article>
  );
}
