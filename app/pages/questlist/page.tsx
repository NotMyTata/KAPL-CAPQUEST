import addQuestUseCase from '@/application/usecase/addQuestUseCase';
import fetchAllQuestsUseCase from '@/application/usecase/fetchAllQuestsUseCase';
import fetchMyActiveQuestsUseCase from '@/application/usecase/fetchMyActiveQuestsUseCase';
import fetchMyQuests from '@/application/usecase/fetchMyQuests';
import QuestRepositoryImpl from '@/infrastructure/repositories/QuestRepositoryImpl';
import React from 'react'

async function page() {
  const questRepository = new QuestRepositoryImpl();

  await new addQuestUseCase(questRepository).execute({
    name: "test",
    description: "test description",
    difficulty: "C",
    is_available: true,
    is_finished: false,
    poster_id: 6,
  });

  console.log(await new fetchAllQuestsUseCase(questRepository).execute());

  console.log(await new fetchMyActiveQuestsUseCase(questRepository).execute(6));

  console.log(await new fetchMyQuests(questRepository).execute(6));

  return (
    <div>page</div>
  )
}

export default page