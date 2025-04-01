import { Button } from "@/components/ui/button"

function ReferralBanner() {
  return (
    <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
      <div>
        <h3 className="font-semibold mb-1">Refer & Earn</h3>
        <p className="text-sm text-muted-foreground">
          Invite friends and earn points for every successful referral. Start sharing today!
        </p>
      </div>
      <Button variant="secondary" className="shrink-0 text-white bg-black hover:text-black">
        Earn Today
      </Button>
    </div>
  )
}

export default ReferralBanner
