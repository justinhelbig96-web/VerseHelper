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
    codeAnnotations: [
      {
        section: "Imports",
        code: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }`,
        explanation:
          "These three using statements load the required libraries. /Fortnite.com/Devices gives access to all UEFN device types like trigger_device and economy_device. /Verse.org/Simulation provides the core async simulation functions. /UnrealEngine.com/Temporary/Diagnostics enables Print() for logging to the UEFN output log during playtests.",
      },
      {
        section: "Class Declaration",
        code: `# Device that awards coins when a player enters a trigger zone
trigger_coin_device := class(creative_device):`,
        explanation:
          "Declares a new Verse class that extends creative_device — the required base class for all UEFN devices. The := operator is Verse's definition syntax (not assignment — it permanently binds the name). The class name trigger_coin_device will appear in the UEFN Content Browser as a placeable device.",
      },
      {
        section: "@editable Properties",
        code: `    @editable TriggerZone : trigger_device = trigger_device{}
    @editable CoinSource  : economy_device  = economy_device{}

    CoinsPerTrigger : int = 100`,
        explanation:
          "Properties marked @editable show up in the UEFN Details panel — you drag real in-map devices onto these slots to wire them up, no code changes needed. trigger_device{} is the default empty value before assignment. CoinsPerTrigger is a plain constant; add @editable to let designers tune it per device instance without recompiling.",
      },
      {
        section: "OnBegin — Subscribe to trigger event",
        code: `    OnBegin<override>()<suspends> : void =
        TriggerZone.TriggeredEvent.Subscribe(OnPlayerEntered)`,
        explanation:
          "OnBegin runs automatically when the round starts. <override> is required to replace the base creative_device version. <suspends> marks this function as a coroutine, which is needed for any function that can pause (Sleep, await, etc.). Subscribe() registers OnPlayerEntered as a listener — every time a player enters the zone, our handler fires.",
      },
      {
        section: "OnPlayerEntered — Award coins",
        code: `    OnPlayerEntered(Agent : agent) : void =
        if (Player := player[Agent]):
            CoinSource.AddResource(Player, CoinsPerTrigger)
            Print("Awarded {CoinsPerTrigger} coins!")`,
        explanation:
          "Trigger zones fire for any agent — including NPCs and creatures. player[Agent] casts the agent to a player type; if the agent is not a real player the cast fails and the if-block is silently skipped. AddResource() credits the amount to the player's coin balance tracked by the economy_device. The {} braces inside Print() are Verse's string interpolation syntax.",
      },
    ],
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
    codeAnnotations: [
      {
        section: "Imports",
        code: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }`,
        explanation:
          "Standard UEFN import set. All device types — button_device, economy_device, item_granter_device — live in /Fortnite.com/Devices. Every Verse file that uses UEFN devices needs this import.",
      },
      {
        section: "Class + @editable Properties",
        code: `button_shop_device := class(creative_device):

    @editable ShopButton   : button_device       = button_device{}
    @editable Wallet       : economy_device       = economy_device{}
    @editable ItemGranter  : item_granter_device  = item_granter_device{}

    ItemCost : int = 200`,
        explanation:
          "Three @editable device slots — assign each in the UEFN Details panel. ShopButton is the physical button players press. Wallet is the economy_device that manages the coin currency. ItemGranter must be pre-configured in the editor with the item to grant. ItemCost is the price in coins; add @editable to make it adjustable per instance.",
      },
      {
        section: "OnBegin — Subscribe to button",
        code: `    OnBegin<override>()<suspends> : void =
        ShopButton.InteractedWithEvent.Subscribe(OnPurchaseAttempt)`,
        explanation:
          "InteractedWithEvent fires when a player presses the button (E key by default). Unlike TriggeredEvent, this only fires on intentional player input — objects or NPCs won't accidentally activate it. We subscribe once at round start and it stays active for the full session.",
      },
      {
        section: "Balance Check",
        code: `    OnPurchaseAttempt(Agent : agent) : void =
        if (Player := player[Agent]):
            CurrentBalance := Wallet.GetResourceCount(Player)
            if (CurrentBalance >= ItemCost):`,
        explanation:
          "GetResourceCount() reads the player's current coin balance from the economy_device. We compare against ItemCost before doing anything — this prevents the balance going negative. Always check before deducting: economy_device does not automatically reject transactions when the player has insufficient funds.",
      },
      {
        section: "Deduct Coins + Grant Item",
        code: `                Wallet.RemoveResource(Player, ItemCost)
                ItemGranter.GrantItem(Agent)
                Print("Purchase successful!")
            else:
                Print("Not enough coins — need {ItemCost}.")`,
        explanation:
          "RemoveResource() deducts the cost from the player's balance. GrantItem() gives the player whatever item is configured on the item_granter_device in the editor — the item is never hardcoded, keeping the device fully data-driven. The else branch provides feedback so players understand why nothing happened.",
      },
    ],
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
    codeAnnotations: [
      {
        section: "Imports",
        code: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }`,
        explanation:
          "Standard UEFN imports. hud_message_device lives in /Fortnite.com/Devices and handles all on-screen player UI messages. /Verse.org/Simulation is needed for Sleep() in the hide-delay coroutine.",
      },
      {
        section: "Class + @editable Properties",
        code: `hud_notify_device := class(creative_device):

    @editable EntryTrigger  : trigger_device     = trigger_device{}
    @editable HUDMessage    : hud_message_device = hud_message_device{}`,
        explanation:
          "EntryTrigger is the zone players walk into. HUDMessage is a hud_message_device whose message text, style, and display duration are configured in the editor — keeping content entirely data-driven. No strings live in this Verse file.",
      },
      {
        section: "OnBegin — Subscribe",
        code: `    OnBegin<override>()<suspends> : void =
        EntryTrigger.TriggeredEvent.Subscribe(OnZoneEntered)`,
        explanation:
          "We subscribe once in OnBegin and the listener stays active for the whole session — no need to re-subscribe after each trigger. Each player who enters independently fires this event.",
      },
      {
        section: "OnZoneEntered — Show + spawn coroutine",
        code: `    OnZoneEntered(Agent : agent) : void =
        if (Player := player[Agent]):
            HUDMessage.Show(Player)
            spawn{ HideAfterDelay(Player) }`,
        explanation:
          "Show() makes the message visible only for this specific player. spawn{} launches HideAfterDelay as a concurrent coroutine — without spawn, the code would block here waiting for the delay before the zone could fire again for other players. Always use spawn{} when you need to wait inside an event handler.",
      },
      {
        section: "HideAfterDelay — Sleep + Hide",
        code: `    HideAfterDelay(Player : player)<suspends> : void =
        Sleep(3.0)
        HUDMessage.Hide(Player)`,
        explanation:
          "<suspends> is required on any function that calls Sleep. Sleep(3.0) pauses this coroutine for 3 seconds without blocking the rest of the game. After the pause, Hide() removes the message from that player's screen. Each player who triggers the zone gets their own independent coroutine running in parallel.",
      },
    ],
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
    codeAnnotations: [
      {
        section: "Imports",
        code: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /Verse.org/Random }
using { /UnrealEngine.com/Temporary/Diagnostics }`,
        explanation:
          "/Verse.org/Random is imported here but not used in this snippet — it's commonly needed alongside timers for randomised event timing. /Fortnite.com/Devices provides timer_device, gate_device, and hud_message_device.",
      },
      {
        section: "Class + @editable Properties",
        code: `countdown_timer_device := class(creative_device):

    @editable CountdownSeconds : float = 60.0
    @editable HUDTimer         : timer_device       = timer_device{}
    @editable ExitGate         : gate_device         = gate_device{}
    @editable FinishMessage    : hud_message_device  = hud_message_device{}`,
        explanation:
          "CountdownSeconds is a float (not int) because Sleep() requires a float — Verse won't implicitly convert. Making it @editable lets designers set different round lengths per device instance without touching code. HUDTimer, ExitGate, and FinishMessage are all wired in the editor.",
      },
      {
        section: "OnBegin — Start timer + Sleep",
        code: `    OnBegin<override>()<suspends> : void =
        HUDTimer.Start()
        Sleep(CountdownSeconds)
        OnTimerExpired()`,
        explanation:
          "HUDTimer.Start() begins the visible countdown on screen. Sleep(CountdownSeconds) suspends this coroutine for the full duration — the server keeps running normally, only this function waits. When Sleep returns, we call OnTimerExpired(). This linear pattern (start → wait → act) is the cleanest way to implement a timed event in Verse.",
      },
      {
        section: "OnTimerExpired — Open gate",
        code: `    OnTimerExpired() : void =
        HUDTimer.Stop()
        ExitGate.Open()
        Print("Time's up! Gate opened.")`,
        explanation:
          "Stop() halts the HUD countdown display. Open() removes the gate barrier so players can walk through. This function has no <suspends> because it only calls instant operations — all three commands execute in the same frame with no waiting. The gate stays open for the rest of the match unless explicitly reset.",
      },
    ],
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
    codeAnnotations: [
      {
        section: "Imports",
        code: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }`,
        explanation:
          "Standard UEFN device import set. item_granter_device lives in /Fortnite.com/Devices alongside trigger_device and hud_message_device.",
      },
      {
        section: "Class + @editable + State",
        code: `item_reward_device := class(creative_device):

    @editable RewardZone    : trigger_device      = trigger_device{}
    @editable ItemGranter   : item_granter_device = item_granter_device{}
    @editable HUDMessage    : hud_message_device  = hud_message_device{}

    var ClaimedPlayers : []player = array{}`,
        explanation:
          "ClaimedPlayers is a mutable array (var) of players — it grows as each player claims their reward. []player means 'array of player'. array{} initialises it empty at round start. This is server-side state that persists for the whole match. Without this tracking, players could walk into the zone repeatedly and receive unlimited items.",
      },
      {
        section: "OnBegin — Subscribe",
        code: `    OnBegin<override>()<suspends> : void =
        RewardZone.TriggeredEvent.Subscribe(OnRewardZoneEntered)`,
        explanation:
          "Same subscribe pattern as other tutorials — hook into the trigger once at round start. The listener stays active for the full session and fires independently for each player.",
      },
      {
        section: "Claim check + Grant",
        code: `    OnRewardZoneEntered(Agent : agent) : void =
        if (Player := player[Agent]):
            if (not ClaimedPlayers.Contains(Player)):
                set ClaimedPlayers += array{Player}
                ItemGranter.GrantItem(Agent)
                HUDMessage.Show(Player)
                Print("Reward granted to player!")`,
        explanation:
          "Contains() checks if this player is already in the claimed list. not inverts the result — the inner block only runs on first entry. set ClaimedPlayers += array{Player} appends the player (Verse requires the set keyword for all mutations of var fields). GrantItem and Show both only fire once per player — subsequent zone entries are silently ignored without any error.",
      },
    ],
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
    codeAnnotations: [
      {
        section: "Imports",
        code: `using { /Fortnite.com/Devices }
using { /Verse.org/Simulation }
using { /UnrealEngine.com/Temporary/Diagnostics }`,
        explanation:
          "Standard UEFN device library imports. gate_device and button_device are both available through /Fortnite.com/Devices. No additional libraries are needed for this system.",
      },
      {
        section: "Class + @editable + State",
        code: `zone_unlock_device := class(creative_device):

    @editable UnlockButton  : button_device       = button_device{}
    @editable Wallet        : economy_device       = economy_device{}
    @editable ZoneGate      : gate_device          = gate_device{}
    @editable ConfirmHUD    : hud_message_device   = hud_message_device{}

    UnlockCost : int = 500
    var IsUnlocked : logic = false`,
        explanation:
          "IsUnlocked is a mutable logic (boolean) flag initialised to false — the gate starts locked. logic is Verse's name for the boolean type. Once set to true, all further button presses are rejected instantly. UnlockCost is a constant — add @editable if you want different prices per device instance across your map.",
      },
      {
        section: "OnBegin — Subscribe",
        code: `    OnBegin<override>()<suspends> : void =
        UnlockButton.InteractedWithEvent.Subscribe(OnUnlockAttempt)`,
        explanation:
          "Subscribe to the button's interaction event so OnUnlockAttempt runs every time any player presses it. The listener is registered once and stays active indefinitely.",
      },
      {
        section: "Guard clause + Balance check",
        code: `    OnUnlockAttempt(Agent : agent) : void =
        if (IsUnlocked) { return }
        if (Player := player[Agent]):
            Balance := Wallet.GetResourceCount(Player)
            if (Balance >= UnlockCost):`,
        explanation:
          "The IsUnlocked guard at the top immediately exits the function if the zone is already open — no further logic runs. This is the guard-clause pattern: handle the early-exit cases first to keep the main logic unindented. The balance check only runs for real players (after the agent→player cast). GetResourceCount reads the current coin balance.",
      },
      {
        section: "Unlock sequence",
        code: `                Wallet.RemoveResource(Player, UnlockCost)
                set IsUnlocked = true
                ZoneGate.Open()
                ConfirmHUD.Show(Player)
                UnlockButton.SetEnabled(false)
                Print("Zone unlocked!")`,
        explanation:
          "These five operations happen in order in the same frame: deduct coins → mark unlocked → open the gate → show confirmation → disable the button. SetEnabled(false) greys out the button visually and stops all future interactions. Even without it the IsUnlocked guard would block re-entry, but disabling gives clear visual feedback to other players that this upgrade is already purchased.",
      },
    ],
  },
];
