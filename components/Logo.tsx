import Image from 'next/image';

const logoAlt = 'A&M FutureTech Solutions Pvt. Ltd. Logo';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex min-w-0 items-center ${className}`}>
      <Image
        src="/images/company-logo.png"
        alt={logoAlt}
        width={891}
        height={891}
        priority
        sizes="(max-width: 639px) 72px, (max-width: 1023px) 84px, 96px"
        className="h-[4.5rem] w-[4.5rem] object-contain sm:h-[5.25rem] sm:w-[5.25rem] lg:h-24 lg:w-24"
      />
    </div>
  );
}
