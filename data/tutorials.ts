import type { Tutorial } from "@/types";

export const TUTORIALS: Tutorial[] = [
  {
    slug: "trigger-coins",
    title: "Trigger Gives Coins",
    description:
      "Give gold to players when they step on a trigger zone — the foundation of any tycoon map.",
    difficulty: "Beginner",
    category: "Tycoon",
    estimatedTime: "10 min",
    devices: ["trigger_device", "economy_device"],
    whatItDoes:
      "When a player enters a trigger zone, they receive a set amount of coins. This is the core mechanic of tycoon maps and collection-based games in UEFN.",
    verseCode: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }

# Device that awards coins when a player enters a trigger zone
trigger_coin_device := class(creative_device):

    # Assign these in the UEFN editor Properties panel
    @editable TriggerZone : trigger_device = trigger_device{}
    @editable CoinSource  : economy_device  = economy_device{}

    CoinsPerTrigger : int = 100

    OnBegin<override>()<suspends> : void =
        # Subscribe to the trigger event — fires when any agent enters
        TriggerZone.TriggeredEvent.Subscribe(OnPlayerEntered)

    OnPlayerEntered(Agent : agent) : void =
        # Cast agent → player (fails silently if it's an NPC)
        if (Player := player[Agent]):
            CoinSource.AddResource(Player, CoinsPerTrigger)
            Print("Awarded {CoinsPerTrigger} coins!")`,
    setupSteps: [
      "Create a new Verse file in UEFN and paste the code above.",
      "Push the device to UEFN via the Verse Explorer.",
      "Drag a trigger_device and an economy_device into your map.",
      "Select your VersePilot device, then assign TriggerZone and CoinSource in the Properties panel.",
      "Adjust the trigger size using the trigger_device extent settings.",
      "Playtest — walk into the zone and watch your coin total increase.",
    ],
    commonMistakes: [
      "Forgetting .Subscribe() — the event never fires without this.",
      "Using Agent directly instead of casting to player[] — NPCs can also trigger the event.",
      "Not assigning devices in the editor — they remain empty references and nothing happens.",
      "Setting CoinsPerTrigger as var instead of a constant — use a named constant or @editable.",
    ],
    tags: ["tycoon", "economy", "trigger", "coins", "beginner"],
  },
  {
    slug: "button-shop",
    title: "Button Shop",
    description:
      "Create an interactive shop where players spend coins to buy items or upgrades.",
    difficulty: "Beginner",
    category: "Tycoon",
    estimatedTime: "15 min",
    devices: ["button_device", "economy_device", "item_granter_device"],
    whatItDoes:
      "Players press a button to spend coins and receive an item or upgrade. The device checks if the player has enough currency before granting the reward.",
    verseCode: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }

# A simple button-driven shop device
button_shop_device := class(creative_device):

    @editable ShopButton   : button_device       = button_device{}
    @editable Wallet       : economy_device       = economy_device{}
    @editable ItemGranter  : item_granter_device  = item_granter_device{}

    ItemCost : int = 200

    OnBegin<override>()<suspends> : void =
        ShopButton.InteractedWithEvent.Subscribe(OnPurchaseAttempt)

    OnPurchaseAttempt(Agent : agent) : void =
        if (Player := player[Agent]):
            CurrentBalance := Wallet.GetResourceCount(Player)
            if (CurrentBalance >= ItemCost):
                Wallet.RemoveResource(Player, ItemCost)
                ItemGranter.GrantItem(Agent)
                Print("Purchase successful!")
            else:
                Print("Not enough coins — need {ItemCost}.")`,
    setupSteps: [
      "Create the Verse file and push it to UEFN.",
      "Place a button_device, economy_device, and item_granter_device in the map.",
      "Configure the item_granter_device with the desired item in its settings.",
      "Assign all three devices in the VersePilot device Properties panel.",
      "Set ItemCost to match your economy balance.",
      "Playtest — collect enough coins, then press the button.",
    ],
    commonMistakes: [
      "Using AddResource instead of RemoveResource when deducting coins.",
      "Not checking balance before deducting — player can go negative.",
      "item_granter_device not configured with an item — nothing gets granted.",
      "Button interact range too small — players can't reach it.",
    ],
    tags: ["shop", "button", "economy", "item granter", "tycoon", "beginner"],
  },
  {
    slug: "hud-message",
    title: "HUD Message System",
    description:
      "Show custom on-screen messages to players using a Verse-driven HUD.",
    difficulty: "Beginner",
    category: "UI",
    estimatedTime: "12 min",
    devices: ["hud_message_device", "trigger_device"],
    whatItDoes:
      "Displays a custom text message on the player's HUD when triggered. Useful for tutorials, story beats, zone notifications, or tycoon tips.",
    verseCode: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }

# Displays a HUD message when a player enters a zone
hud_notify_device := class(creative_device):

    @editable EntryTrigger  : trigger_device     = trigger_device{}
    @editable HUDMessage    : hud_message_device = hud_message_device{}

    OnBegin<override>()<suspends> : void =
        EntryTrigger.TriggeredEvent.Subscribe(OnZoneEntered)

    OnZoneEntered(Agent : agent) : void =
        if (Player := player[Agent]):
            # Show the message configured in the hud_message_device properties
            HUDMessage.Show(Player)
            # Auto-hide after 3 seconds
            spawn{ HideAfterDelay(Player) }

    HideAfterDelay(Player : player)<suspends> : void =
        Sleep(3.0)
        HUDMessage.Hide(Player)`,
    setupSteps: [
      "Create the Verse file and push it.",
      "Place a trigger_device and hud_message_device in the map.",
      "In the hud_message_device, set Message Text to your desired string.",
      "Assign EntryTrigger and HUDMessage in Properties.",
      "Trigger activation: set to 'Players' if you only want player triggers.",
      "Playtest — walk into the zone, the message should appear and fade.",
    ],
    commonMistakes: [
      "Calling HUDMessage.Show() without a player argument — pass the player explicitly.",
      "Not using spawn{} for the delay coroutine — will freeze the event handler.",
      "Message not visible — check hud_message_device visibility settings.",
      "Trigger fires multiple times — consider adding a cooldown flag.",
    ],
    tags: ["HUD", "UI", "message", "notification", "trigger", "beginner"],
  },
  {
    slug: "timer-system",
    title: "Countdown Timer System",
    description:
      "Build a server-side countdown timer that ends the round or opens a gate.",
    difficulty: "Intermediate",
    category: "Gameplay",
    estimatedTime: "20 min",
    devices: ["timer_device", "hud_message_device", "gate_device"],
    whatItDoes:
      "Runs a countdown timer from a set duration. When it expires, it can open a gate, trigger an event, or display a message — perfect for time-limited challenges or parkour maps.",
    verseCode: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /Verse.org/Random }
using { /UnrealEngine.com/Temporary/Diagnostics }

# Server-side countdown timer with gate unlock on expiry
countdown_timer_device := class(creative_device):

    @editable CountdownSeconds : float = 60.0
    @editable HUDTimer         : timer_device       = timer_device{}
    @editable ExitGate         : gate_device         = gate_device{}
    @editable FinishMessage    : hud_message_device  = hud_message_device{}

    OnBegin<override>()<suspends> : void =
        HUDTimer.Start()
        # Wait for the full duration
        Sleep(CountdownSeconds)
        OnTimerExpired()

    OnTimerExpired() : void =
        HUDTimer.Stop()
        ExitGate.Open()
        Print("Time's up! Gate opened.")`,
    setupSteps: [
      "Create the Verse file and push it.",
      "Place a timer_device, gate_device, and hud_message_device.",
      "Configure the timer_device to count down mode with matching CountdownSeconds.",
      "Set up the gate_device to block the exit path.",
      "Assign all devices in Properties.",
      "Set CountdownSeconds to your desired round length (in seconds).",
      "Playtest — the gate should open when the timer hits zero.",
    ],
    commonMistakes: [
      "Sleep() takes seconds as float — pass 60.0 not 60.",
      "Timer device and Verse timer must both be configured to match.",
      "Gate not closed by default — check gate_device initial state.",
      "Device doesn't start automatically — ensure OnBegin is marked <override>.",
    ],
    tags: ["timer", "countdown", "gate", "parkour", "round", "intermediate"],
  },
  {
    slug: "item-granter-reward",
    title: "Item Granter Reward",
    description:
      "Grant players items as rewards when they complete objectives or reach milestones.",
    difficulty: "Beginner",
    category: "Gameplay",
    estimatedTime: "10 min",
    devices: ["item_granter_device", "trigger_device", "conditional_button_device"],
    whatItDoes:
      "Automatically grants a configured item to any player who completes an objective — triggered by entering a zone or pressing a button. Essential for reward systems, loot drops, and progression unlocks.",
    verseCode: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }

# Grant an item when a player enters the reward zone
item_reward_device := class(creative_device):

    @editable RewardZone    : trigger_device      = trigger_device{}
    @editable ItemGranter   : item_granter_device = item_granter_device{}
    @editable HUDMessage    : hud_message_device  = hud_message_device{}

    # Track which players already claimed the reward
    var ClaimedPlayers : []player = array{}

    OnBegin<override>()<suspends> : void =
        RewardZone.TriggeredEvent.Subscribe(OnRewardZoneEntered)

    OnRewardZoneEntered(Agent : agent) : void =
        if (Player := player[Agent]):
            # Only grant if not already claimed
            if (not ClaimedPlayers.Contains(Player)):
                set ClaimedPlayers += array{Player}
                ItemGranter.GrantItem(Agent)
                HUDMessage.Show(Player)
                Print("Reward granted to player!")`,
    setupSteps: [
      "Create the Verse file and push it.",
      "Place a trigger_device, item_granter_device, and hud_message_device.",
      "Configure the item to grant in item_granter_device item settings.",
      "Set the HUD message text to your reward announcement.",
      "Assign all devices in Properties.",
      "Playtest — enter the zone once; item granted. Enter again; no duplicate.",
    ],
    commonMistakes: [
      "Not tracking claimed players — items will grant repeatedly.",
      "item_granter_device has no item set — GrantItem() silently fails.",
      "Using Grant() instead of GrantItem() — check the correct method name in your UEFN version.",
      "Trigger fires for eliminated players — filter by checking player state.",
    ],
    tags: ["item", "granter", "reward", "loot", "beginner", "objective"],
  },
  {
    slug: "zone-unlock",
    title: "Zone Unlock System",
    description:
      "Lock zones behind a coin cost — players pay to open new areas of the map.",
    difficulty: "Intermediate",
    category: "Tycoon",
    estimatedTime: "25 min",
    devices: ["button_device", "economy_device", "gate_device", "hud_message_device"],
    whatItDoes:
      "Players interact with a purchase button to unlock a new zone. The system deducts coins, opens a gate or barrier, and shows a confirmation message. Essential for tycoon and progression maps.",
    verseCode: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }

# Zone unlock system — spend coins to open a new area
zone_unlock_device := class(creative_device):

    @editable UnlockButton  : button_device       = button_device{}
    @editable Wallet        : economy_device       = economy_device{}
    @editable ZoneGate      : gate_device          = gate_device{}
    @editable ConfirmHUD    : hud_message_device   = hud_message_device{}

    UnlockCost : int = 500

    # Prevent the gate from being opened multiple times
    var IsUnlocked : logic = false

    OnBegin<override>()<suspends> : void =
        UnlockButton.InteractedWithEvent.Subscribe(OnUnlockAttempt)

    OnUnlockAttempt(Agent : agent) : void =
        if (IsUnlocked) { return }
        if (Player := player[Agent]):
            Balance := Wallet.GetResourceCount(Player)
            if (Balance >= UnlockCost):
                Wallet.RemoveResource(Player, UnlockCost)
                set IsUnlocked = true
                ZoneGate.Open()
                ConfirmHUD.Show(Player)
                UnlockButton.SetEnabled(false)
                Print("Zone unlocked!")`,
    setupSteps: [
      "Create the Verse file and push it.",
      "Place a button_device near the zone entrance.",
      "Place a gate_device or barrier blocking the zone.",
      "Place an economy_device tracking the coin currency.",
      "Assign all devices in Properties and set UnlockCost.",
      "Configure the HUD message text in hud_message_device.",
      "Playtest — collect coins, press the button, zone opens permanently.",
    ],
    commonMistakes: [
      "Not setting IsUnlocked = true — gate can be reopened after being reset.",
      "Forgetting SetEnabled(false) on the button — players can keep clicking.",
      "Gate resets on round restart — configure gate_device reset settings.",
      "Wallet.GetResourceCount() returns 0 if economy device not initialized.",
    ],
    tags: ["zone", "unlock", "gate", "tycoon", "economy", "progression", "intermediate"],
  },
];
