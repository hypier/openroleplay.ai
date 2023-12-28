import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/src/components";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import CharacterCardPlaceholder from "../cards/character-card-placeholder";
import CharacterCard from "../cards/character-card";
import { AspectRatio } from "@repo/ui/src/components/aspect-ratio";
import { Plus } from "lucide-react";
import { useState } from "react";
import CharacterForm from "./character-form";

const NewCharacter = ({ onClick }: { onClick: any }) => {
  return (
    <AspectRatio
      ratio={1 / 1.75}
      className="group w-full h-full hover:-translate-y-1 duration-200 border border-dashed hover:shadow-lg place-content-center rounded-lg"
      role="button"
      onClick={onClick}
    >
      <Card className="rounded-lg p-2 w-full h-full flex items-center justify-center border-none gap-2">
        <Plus /> Create character
      </Card>
    </AspectRatio>
  );
};

export function MyCharacters() {
  const allCharacters = useQuery(api.characters.listMy) || [];
  const characters = allCharacters.filter((character) => character.name);
  const [draftCharacter, setDraftCharacter] = useState(false) as any;
  return (
    <>
      {draftCharacter ? (
        <CharacterForm
          id={draftCharacter?._id}
          name={draftCharacter?.name}
          description={draftCharacter?.description}
          instructions={draftCharacter?.instructions}
          greetings={draftCharacter?.greetings}
          cardImageUrl={draftCharacter?.cardImageUrl}
          isEdit={draftCharacter === true ? false : true}
          onClickGoBack={() => setDraftCharacter(false)}
        />
      ) : (
        <Card className="w-full h-full shadow-none lg:shadow-xl border-transparent lg:border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center">My Characters</CardTitle>
            <CardDescription>Create and customize characters.</CardDescription>
          </CardHeader>
          <CardContent className="px-4 flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4">
            <NewCharacter onClick={() => setDraftCharacter(true)} />
            {characters
              ? characters.map(
                  (character) =>
                    character.name && (
                      <div className="relative">
                        <Button
                          className="absolute z-[2] right-4 top-4 h-8 rounded-full"
                          variant="outline"
                          onClick={() => setDraftCharacter(character)}
                        >
                          Edit
                        </Button>
                        <CharacterCard
                          id={character._id}
                          key={character._id}
                          name={character.name}
                          numChats={character.numChats as number}
                          cardImageUrl={character.cardImageUrl as string}
                          description={character.description}
                        />
                      </div>
                    )
                )
              : Array.from({ length: 12 }).map((_, index) => (
                  <CharacterCardPlaceholder key={index} />
                ))}
            {Array.from({ length: 10 - characters?.length - 1 }).map(
              (_, index) => (
                <CharacterCardPlaceholder key={index} />
              )
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
