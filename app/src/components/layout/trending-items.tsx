export default function TrendingItems() {
  return (
    <div className="mt-4 bg-gray-900 rounded-xl p-4">
      <h2 className="text-xl font-bold mb-4">Trending in Web3</h2>
      <TrendingItem tag="web3" subtitle="Trending with Lens" />
      <TrendingItem
        tag="lens"
        subtitle="Gittiğiniz her yerde hayata özgürce dokunmanız için!"
        promoted="Deep Fresh Türkiye"
      />
      <TrendingItem tag="aitutors" subtitle="9,042 pills" promoted="xxx" />
    </div>
  );
}

const TrendingItem = ({
  tag,
  subtitle,
  promoted,
}: {
  tag: string;
  subtitle: string;
  promoted?: string;
}) => {
  return (
    <div className="py-2 hover:bg-gray-800 cursor-pointer">
      <p className="text-sm text-gray-500">#{tag}</p>
      <p className="text-sm">{subtitle}</p>
      {promoted && (
        <p className="text-xs text-gray-500">Promoted by {promoted}</p>
      )}
    </div>
  );
};
